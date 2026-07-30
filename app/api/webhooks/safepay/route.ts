import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

const WEBHOOK_SECRET = process.env.SAFEPAY_WEBHOOK_SECRET!;

interface AttendeeRecord {
  name: string;
  email: string;
  phone: string;
  cnic: string;
}

interface SafepayWebhookEvent {
  type: string;
  data: {
    order_id?: string;
    metadata?: { order_id?: string };
    [key: string]: unknown;
  };
}

function isValidSignature(rawBody: string, signatureHeader: string | null): boolean {
  if (!signatureHeader) return false;

  const expected = crypto.createHmac("sha512", WEBHOOK_SECRET).update(rawBody).digest("hex");

  const expectedBuf = Buffer.from(expected, "utf8");
  const givenBuf = Buffer.from(signatureHeader, "utf8");
  if (expectedBuf.length !== givenBuf.length) return false;

  return crypto.timingSafeEqual(expectedBuf, givenBuf);
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-sfpy-signature");

  if (!isValidSignature(rawBody, signature)) {
    console.warn("Safepay webhook: signature verification failed");
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  let event: SafepayWebhookEvent;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const orderId = event.data?.metadata?.order_id ?? event.data?.order_id;
  if (!orderId) {
    console.warn("Safepay webhook: no order_id in payload", event);
    return NextResponse.json({ received: true });
  }

  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) {
    console.warn(`Safepay webhook: order ${orderId} not found`);
    return NextResponse.json({ received: true });
  }

  switch (event.type) {
    case "payment.succeeded": {
      if (order.paymentStatus === "PAID") {
        break;
      }

      const attendeesData = order.attendeesData as unknown as AttendeeRecord[];

      await prisma.order.update({
        where: { id: order.id },
        data: {
          paymentStatus: "PAID",
          tickets: {
            create: attendeesData.map((a, i) => ({
              ticketCode: `${order.orderNumber}-${i + 1}`,
              attendeeName: a.name,
              attendeeEmail: a.email,
              attendeePhone: a.phone,
              attendeeCnic: a.cnic,
            })),
          },
        },
      });

      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `https://${req.headers.get("host")}`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 sec timeout

      try {
        const workerRes = await fetch(`${baseUrl}/api/jobs/fulfill-tickets`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-worker-secret": process.env.WORKER_SECRET!,
          },
          body: JSON.stringify({ orderId: order.id }),
          signal: controller.signal,
        });

        if (!workerRes.ok) {
          console.error("Fulfillment worker status:", workerRes.status);
        }
      } catch (err: unknown) {
        const error = err as Error;

        if (error.name === "AbortError") {
          console.warn("Fulfillment request timed out, but task running in background");
        } else {
          console.error("Failed to trigger worker:", error.message || error);
        }
      } finally {
        clearTimeout(timeoutId);
      }

      break;
    }

    case "payment.failed": {
      if (order.paymentStatus === "PENDING") {
        await prisma.order.update({
          where: { id: order.id },
          data: { paymentStatus: "FAILED" },
        });
      }
      break;
    }

    default:
      break;
  }

  return NextResponse.json({ received: true });
}