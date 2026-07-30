import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);
const FROM_ADDRESS = process.env.TICKETS_FROM_EMAIL ?? "tickets@smashhzone.com";

export interface SendTicketEmailInput {
  to: string;
  attendeeName: string;
  orderNumber: string;
  ticketCode: string;
  pdfBuffer: Buffer;
}

export async function sendTicketEmail({
  to,
  attendeeName,
  orderNumber,
  ticketCode,
  pdfBuffer,
}: SendTicketEmailInput) {
  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to,
    subject: `Your Smashh Zone Ticket — Order ${orderNumber}`,
    html: `
      <p>Hi ${attendeeName},</p>
      <p>Your ticket is attached as a PDF. Bring it printed or on your phone & your CNIC — the QR code inside is scanned at entry.</p>
      <p>Ticket code: <strong>${ticketCode}</strong></p>
      <p>See you there!</p>
    `,
    attachments: [
      {
        filename: `${ticketCode}.pdf`,
        content: pdfBuffer,
      },
    ],
  });

  if (error) {
    throw new Error(`Resend error sending to ${to}: ${error.message}`);
  }
}