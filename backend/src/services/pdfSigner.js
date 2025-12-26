const fs = require("fs");
const path = require("path");
const { PDFDocument } = require("pdf-lib");
const { sha256 } = require("../utils/hash");

async function signPdf({
  pdfPath,
  signatureBase64,
  coords,
  db
}) {
  const originalPdfBytes = fs.readFileSync(pdfPath);
  const originalHash = sha256(originalPdfBytes);

  const pdfDoc = await PDFDocument.load(originalPdfBytes);
  const page = pdfDoc.getPages()[0];
  const { width, height } = page.getSize();

  const signatureImageBytes = Buffer.from(
    signatureBase64.split(",")[1],
    "base64"
  );

  const image = await pdfDoc.embedPng(signatureImageBytes);

  // Convert relative → absolute PDF coordinates
  const boxWidth = coords.wPercent * width;
  const boxHeight = coords.hPercent * height;

  const x = coords.xPercent * width;
  const y =
    height -
    coords.yPercent * height -
    boxHeight;

  // Aspect-ratio preserving scale
  const scale = Math.min(
    boxWidth / image.width,
    boxHeight / image.height
  );

  const drawWidth = image.width * scale;
  const drawHeight = image.height * scale;

  // Center image inside the box
  const drawX = x + (boxWidth - drawWidth) / 2;
  const drawY = y + (boxHeight - drawHeight) / 2;

  page.drawImage(image, {
    x: drawX,
    y: drawY,
    width: drawWidth,
    height: drawHeight
  });

  const signedPdfBytes = await pdfDoc.save();
  const signedHash = sha256(signedPdfBytes);

  const outputPath = path.join(
    "uploads/signed",
    `signed-${Date.now()}.pdf`
  );

  fs.writeFileSync(outputPath, signedPdfBytes);

  // Audit log
  await db.collection("audit_logs").insertOne({
    originalHash,
    signedHash,
    createdAt: new Date()
  });

  return outputPath;
}

module.exports = { signPdf };
