import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_access_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized scanner session" }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);

    const { ticketCode } = await req.json();
    if (!ticketCode || typeof ticketCode !== "string") {
      return NextResponse.json({ error: "Invalid ticket payload" }, { status: 400 });
    }

    const cleanCode = ticketCode.trim();

    const ticket = await prisma.ticket.findUnique({
      where: { ticketCode: cleanCode },
      include: { order: true },
    });

    if (!ticket) {
      return NextResponse.json(
        { status: "INVALID", error: "Ticket code not found in system" },
        { status: 404 }
      );
    }

    if (ticket.order.paymentStatus !== "PAID") {
      return NextResponse.json(
        { status: "UNPAID", error: "Order for this ticket has not been paid" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      status: "VALID",
      ticket: {
        ticketCode: ticket.ticketCode,
        attendeeName: ticket.attendeeName,
        attendeeCnic: ticket.attendeeCnic,
        attendeePhone: ticket.attendeePhone,
        passTier: ticket.order.passTier ?? "Standard",
        orderNumber: ticket.order.orderNumber,
      },
    });
  } catch {
    return NextResponse.json({ error: "Validation server error" }, { status: 500 });
  }
}