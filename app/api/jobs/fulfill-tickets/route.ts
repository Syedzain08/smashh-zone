import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateTicketPdf } from "@/lib/pdf";
import { sendTicketEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("x-worker-secret");
  if (authHeader !== process.env.WORKER_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { orderId, ticketId } = await req.json();

  if (!orderId && !ticketId) {
    return NextResponse.json(
      { error: "Either orderId or ticketId must be provided" },
      { status: 400 }
    );
  }

  let ticketsToProcess: Array<
    Awaited<ReturnType<typeof prisma.ticket.findUniqueOrThrow>> & {
      order: Awaited<ReturnType<typeof prisma.order.findUniqueOrThrow>>;
    }
  > = [];

  if (ticketId) {
    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
      include: { order: true },
    });

    if (ticket) {
      ticketsToProcess.push(ticket);
    }
  } 
  else if (orderId) {
    ticketsToProcess = await prisma.ticket.findMany({
      where: { orderId },
      include: { order: true },
    });
  }

  if (ticketsToProcess.length === 0) {
    return NextResponse.json(
      { error: "No matching tickets found to fulfill" },
      { status: 404 }
    );
  }

  const results = await Promise.allSettled(
    ticketsToProcess.map(async (ticket) => {
      const order = ticket.order;
      const recipientEmail = ticket.attendeeEmail || order.buyerEmail;

      const pdfBuffer = await generateTicketPdf({
        ticketCode: ticket.ticketCode,
        attendeeName: ticket.attendeeName,
        attendeeCnic: ticket.attendeeCnic ?? "N/A",
        attendeeEmail: recipientEmail,
        attendeePhone: ticket.attendeePhone ?? "N/A",
        passTier: order.passTier ?? "RHYTHM",
        orderNumber: order.orderNumber,
      });

      await sendTicketEmail({
        to: recipientEmail,
        attendeeName: ticket.attendeeName,
        orderNumber: order.orderNumber,
        ticketCode: ticket.ticketCode,
        pdfBuffer,
      });
    })
  );

  const failures = results.filter((r) => r.status === "rejected");
  if (failures.length > 0) {
    console.error(
      `Fulfillment completed with ${failures.length} errors`,
      failures
    );
  }

  return NextResponse.json({
    processed: ticketsToProcess.length,
    failedCount: failures.length,
  });
}