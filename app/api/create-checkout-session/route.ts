import { NextRequest, NextResponse } from "next/server";
import { customAlphabet } from "nanoid";
import SafepayNodeCore from "@sfpy/node-core";
import { prisma } from "@/lib/prisma";
import { AffiliationType } from "@prisma/client";
import computePricing, { VARIANTS } from "@/lib/pricing";

const SAFEPAY_SECRET_KEY = process.env.SAFEPAY_SECRET_KEY;
const SAFEPAY_PUBLIC_KEY = process.env.NEXT_PUBLIC_SAFEPAY_PUBLIC_KEY;
const IS_LIVE = process.env.IS_LIVE === "true";

if (!SAFEPAY_SECRET_KEY) {
  throw new Error("SAFEPAY_SECRET_KEY environment variable is required.");
}

if (!SAFEPAY_PUBLIC_KEY) {
  throw new Error("SAFEPAY_PUBLIC_KEY environment variable is required.");
}

const SAFEPAY_HOST = IS_LIVE
  ? "https://api.getsafepay.com"
  : "https://sandbox.api.getsafepay.com";

const safepay = new SafepayNodeCore(SAFEPAY_SECRET_KEY, {
  authType: "secret",
  host: SAFEPAY_HOST,
});

const nanoid = customAlphabet("0123456789ABCDEFGHJKMNPQRSTVWXYZ", 8);

const AFFILIATION_MAP: Record<string, AffiliationType> = {
  Private: "PRIVATE",
  Association: "ASSOCIATION",
  School: "SCHOOL",
  College: "COLLEGE",
  University: "UNIVERSITY",
};

interface AttendeeInput {
  name: string;
  cnic: string;
  phone: string;
  email: string;
}

interface CheckoutRequestBody {
  tierKey: string;
  quantity: number;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  buyerCnic: string;
  affiliationType: keyof typeof AFFILIATION_MAP;
  institutionName?: string;
  attendees: AttendeeInput[];
}

export async function POST(req: NextRequest) {
  let body: CheckoutRequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const variant = VARIANTS[body.tierKey?.toLowerCase() as keyof typeof VARIANTS];
  if (!variant) {
    return NextResponse.json({ error: "Unknown pass tier" }, { status: 400 });
  }

  const quantity = body.quantity;
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
    return NextResponse.json({ error: "Invalid quantity" }, { status: 400 });
  }

  const expectedAttendeeCount = quantity - 1;
  if (!Array.isArray(body.attendees) || body.attendees.length !== expectedAttendeeCount) {
    return NextResponse.json({ error: "Attendee count doesn't match quantity" }, { status: 400 });
  }

  const affiliationType = AFFILIATION_MAP[body.affiliationType];
  if (!affiliationType) {
    return NextResponse.json({ error: "Invalid affiliation type" }, { status: 400 });
  }
  if (affiliationType !== "PRIVATE" && !body.institutionName?.trim()) {
    return NextResponse.json({ error: "Institution name required" }, { status: 400 });
  }

  const pricing = computePricing(variant.price, quantity, variant.label, body.affiliationType);
  const orderNumber = `SMZ-${nanoid()}`;

  const attendeesData = [
    {
      name: body.buyerName,
      email: body.buyerEmail,
      phone: body.buyerPhone,
      cnic: body.buyerCnic,
    },
    ...body.attendees.map((a) => ({
      name: a.name,
      email: a.email,
      phone: a.phone,
      cnic: a.cnic,
    })),
  ];

  let order;
  try {
    order = await prisma.order.create({
      data: {
        orderNumber,
        passTier: variant.tier,
        quantity,
        grossSubtotal: BigInt(pricing.grossSubtotalPaisa),
        totalDiscount: BigInt(pricing.totalDiscountPaisa),
        netSubtotal: BigInt(pricing.netSubtotalPaisa),
        processingFee: BigInt(pricing.processingFeePaisa),
        totalAmount: BigInt(pricing.totalAmountPaisa),
        buyerName: body.buyerName,
        buyerEmail: body.buyerEmail,
        buyerPhone: body.buyerPhone,
        buyerCnic: body.buyerCnic,
        affiliationType,
        institutionName: affiliationType === "PRIVATE" ? null : body.institutionName,
        paymentStatus: "PENDING",
        attendeesData,
      },
    });
  } catch (err) {
    console.error("Order creation failed:", err);
    return NextResponse.json({ error: "Could not create order" }, { status: 500 });
  }

  try {
    const session = await safepay.payments.session.setup({
      merchant_api_key: SAFEPAY_PUBLIC_KEY,
      intent: "CYBERSOURCE",
      mode: "payment",
      entry_mode: "raw",
      include_fees: false,
      currency: "PKR",
      amount: pricing.totalAmountPaisa,
      metadata: {
        order_id: order.id,
      },
    });

    const trackerToken = session.data.tracker.token;

    const passport = await safepay.client.passport.create();
    const authToken = passport.data;

    const checkoutUrl = safepay.checkout.createCheckoutUrl({
      env: IS_LIVE ? "production" : "sandbox",
      tbt: authToken,
      tracker: trackerToken,
      source: "hosted",
      order_id: order.id,
      redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}/order/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/order/cancel`,
    });

    await prisma.order.update({
      where: { id: order.id },
      data: { gatewayReference: trackerToken },
    });

    return NextResponse.json({
      checkoutUrl,
      orderId: order.id,
      orderNumber: order.orderNumber,
    });
  } catch (err) {
    console.error("Safepay session creation failed:", err);

    await prisma.order
      .update({
        where: { id: order.id },
        data: { paymentStatus: "FAILED" },
      })
      .catch(() => {
      });

    return NextResponse.json(
      { error: "Could not start checkout session. Please try again." },
      { status: 500 }
    );
  }
}