const express = require("express");
const { signPdf } = require("../services/pdfSigner");

const router = express.Router();

router.post("/", async (req, res) => {
  const { pdfId, signatureBase64, coordinates } = req.body;

  if (!pdfId || !signatureBase64 || !coordinates) {
    return res.status(400).json({ error: "Invalid payload" });
  }

  try {
    const signedPath = await signPdf({
      pdfPath: `uploads/${pdfId}.pdf`,
      signatureBase64,
      coords: coordinates,
      db: req.app.locals.db
    });

    res.json({
      signedPdfUrl: `http://localhost:5000/${signedPath}`
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Signing failed" });
  }
});

module.exports = router;
