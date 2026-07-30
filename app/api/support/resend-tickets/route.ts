import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const resendSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address."),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const result = resendSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const email = result.data.email.toLowerCase();

    const singleTicket = await prisma.ticket.findFirst({
      where: {
        attendeeEmail: email,
        order: { paymentStatus: "PAID" },
      },
      orderBy: {
    createdAt: "desc", 
  },
    });

    let payload: { ticketId?: string; orderId?: string } | null = null;

    if (singleTicket) {
      payload = { ticketId: singleTicket.id };
    } else {
      const order = await prisma.order.findFirst({
        where: {
          buyerEmail: email,
          paymentStatus: "PAID",
        },
        orderBy: {
    createdAt: "desc", 
  },
      });

      if (order) {
        payload = { orderId: order.id };
      }
    }

    if (!payload) {
      return NextResponse.json({
        success: true,
        message: "If an active pass was found for this email, it has been sent!",
      });
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `https://${req.headers.get("host")}`;

    fetch(`${baseUrl}/api/jobs/fulfill-tickets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-worker-secret": process.env.WORKER_SECRET!,
      },
      body: JSON.stringify(payload),
    }).catch((err) => {
      console.error("Failed to re-trigger ticket fulfillment worker:", err);
    });

    return NextResponse.json({
      success: true,
      message: "If an active pass was found for this email, it has been sent!",
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to process request. Please try again later." },
      { status: 500 }
    );
  }
}