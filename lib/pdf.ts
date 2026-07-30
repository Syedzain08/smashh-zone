import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import QRCode from "qrcode";

export interface TicketPdfInput {
  ticketCode: string;
  attendeeName: string;
  attendeeCnic: string;
  attendeeEmail: string;
  attendeePhone: string;
  passTier: string;
  orderNumber: string;
}

export async function generateTicketPdf(ticket: TicketPdfInput): Promise<Buffer> {
  const qrPng = await QRCode.toBuffer(ticket.ticketCode, {
    type: "png",
    width: 400,
    margin: 1,
    color: {
      dark: "#0F5233", 
      light: "#FFFFFF",
    },
  });

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([620, 320]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const primaryGreen = rgb(0.08, 0.38, 0.24); 
  const textMuted = rgb(0.7, 0.85, 0.75);
  const white = rgb(1, 1, 1);
  const lightMuted = rgb(0.5, 0.5, 0.5);

  const stubWidth = 190;
  const mainWidth = 620 - stubWidth; 

  page.drawRectangle({
    x: 0,
    y: 0,
    width: mainWidth,
    height: 320,
    color: primaryGreen,
  });

  page.drawRectangle({
    x: mainWidth,
    y: 0,
    width: stubWidth,
    height: 320,
    color: white,
  });


  page.drawText("SMASHH ZONE", {
    x: 30,
    y: 275,
    size: 20,
    font: boldFont,
    color: white,
  });

  const badgeText = (ticket.passTier || "ALL-ACCESS").toUpperCase();
  const badgeWidth = boldFont.widthOfTextAtSize(badgeText, 10) + 20;
  
  page.drawRectangle({
    x: mainWidth - badgeWidth - 30,
    y: 268,
    width: badgeWidth,
    height: 24,
    color: white,
    borderColor: white,
    borderWidth: 1,
  });

  page.drawText(badgeText, {
    x: mainWidth - badgeWidth - 20,
    y: 275,
    size: 10,
    font: boldFont,
    color: primaryGreen,
  });

  page.drawText("SEP 5-6, 2026", {
    x: 30,
    y: 230,
    size: 28,
    font: boldFont,
    color: white,
  });

  page.drawText("GADDAFI STADIUM  •  LAHORE, PAKISTAN", {
    x: 30,
    y: 212,
    size: 9,
    font: boldFont,
    color: textMuted,
  });

  page.drawLine({
    start: { x: 30, y: 195 },
    end: { x: mainWidth - 30, y: 195 },
    thickness: 0.8,
    color: rgb(0.15, 0.5, 0.32),
  });

  page.drawText("ATTENDEE NAME", {
    x: 30,
    y: 175,
    size: 8,
    font: boldFont,
    color: textMuted,
  });
  page.drawText(ticket.attendeeName, {
    x: 30,
    y: 158,
    size: 13,
    font: boldFont,
    color: white,
  });

  page.drawText("CNIC", {
    x: 230,
    y: 175,
    size: 8,
    font: boldFont,
    color: textMuted,
  });
  page.drawText(ticket.attendeeCnic || "N/A", {
    x: 230,
    y: 158,
    size: 12,
    font,
    color: white,
  });

  page.drawText("PHONE NUMBER", {
    x: 30,
    y: 130,
    size: 8,
    font: boldFont,
    color: textMuted,
  });
  page.drawText(ticket.attendeePhone || "N/A", {
    x: 30,
    y: 113,
    size: 12,
    font,
    color: white,
  });

  page.drawText("EMAIL", {
    x: 230,
    y: 130,
    size: 8,
    font: boldFont,
    color: textMuted,
  });
  page.drawText(ticket.attendeeEmail, {
    x: 230,
    y: 113,
    size: 11,
    font,
    color: white,
  });

  const disclaimer =
    "This ticket is valid for one entry only. Please carry a valid CNIC matching the details above for gate verification.";
  page.drawText(disclaimer, {
    x: 30,
    y: 40,
    size: 7.5,
    font,
    color: textMuted,
    maxWidth: mainWidth - 60,
    lineHeight: 10,
  });


  const qrImage = await pdfDoc.embedPng(qrPng);
  const qrSize = 130;
  const qrX = mainWidth + (stubWidth - qrSize) / 2;
  const qrY = 120;

  page.drawImage(qrImage, {
    x: qrX,
    y: qrY,
    width: qrSize,
    height: qrSize,
  });

  const codeWidth = font.widthOfTextAtSize(ticket.ticketCode, 9);
  page.drawText(ticket.ticketCode, {
    x: mainWidth + (stubWidth - codeWidth) / 2,
    y: qrY - 18,
    size: 9,
    font,
    color: lightMuted,
  });

  const scanText = "SCAN AT ENTRY";
  const scanWidth = boldFont.widthOfTextAtSize(scanText, 9);
  page.drawText(scanText, {
    x: mainWidth + (stubWidth - scanWidth) / 2,
    y: qrY - 38,
    size: 9,
    font: boldFont,
    color: primaryGreen,
  });

  for (let dashY = 10; dashY < 310; dashY += 10) {
    page.drawLine({
      start: { x: mainWidth, y: dashY },
      end: { x: mainWidth, y: dashY + 5 },
      thickness: 1,
      color: rgb(0.85, 0.85, 0.85),
    });
  }

  page.drawCircle({
    x: mainWidth,
    y: 320,
    size: 10,
    color: white,
  });
  page.drawCircle({
    x: mainWidth,
    y: 0,
    size: 10,
    color: white,
  });

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes.buffer);
}