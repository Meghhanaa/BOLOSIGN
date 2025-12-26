# BOLOSIGN – Signature Injection Engine

BOLOSIGN is a full-stack PDF signature and form-field editor that allows users to place, fill, and permanently embed fields such as signature, text, date, image, and radio buttons onto PDF documents with pixel-perfect accuracy across all screen sizes.

The project demonstrates how to reliably bridge responsive browser coordinates with static PDF coordinates while maintaining document integrity and auditability.

---

## Features

### Frontend – Responsive PDF Editor
- Render any PDF (A4 or user-uploaded)
- Drag and drop fields:
  - Text
  - Signature
  - Image
  - Date
  - Radio
- Resize and reposition fields
- Percentage-based coordinate system for responsiveness
- Correct field anchoring on desktop and mobile
- Editable fields with commit-on-enter or done action
- Clean, modern, production-style UI

### Backend – Burn-In Engine
- Accepts PDF ID, field metadata, and signature image
- Converts browser coordinates to PDF coordinates
- Permanently embeds fields into the PDF
- Maintains aspect ratio for images and signatures
- Generates a signed PDF and returns a download URL

### Security and Audit Trail
- SHA-256 hash of original PDF
- SHA-256 hash of signed PDF
- Hashes stored in MongoDB
- Enables verification of document integrity

---

## Core Problem Addressed

Browsers and PDFs use different coordinate systems:

Browser:
- CSS pixels
- Top-left origin
- Responsive layout

PDF:
- Points (72 DPI)
- Bottom-left origin
- Static layout

Solution:
All field positions are stored as relative percentages and converted on the backend, ensuring consistent placement across devices and accurate PDF embedding.

---

## Tech Stack

Frontend:
- React.js
- react-pdf (PDF.js)
- react-rnd
- Vite

Backend:
- Node.js
- Express.js
- pdf-lib
- MongoDB

---

## Project Structure

BOLOSIGN/
├── frontend/
│   ├── public/
│   │   └── sample.pdf
│   ├── src/
│   │   ├── components/
│   │   │   ├── Toolbar.jsx
│   │   │   ├── PdfCanvas.jsx
│   │   │   ├── Field.jsx
│   │   │   └── useResponsiveFields.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── index.html
│   └── vite.config.js
│
├── backend/
│   ├── src/
│   │   ├── server.js
│   │   ├── routes/
│   │   │   ├── documents.js
│   │   │   └── signPdf.js
│   │   ├── services/
│   │   │   └── pdfSigner.js
│   │   └── utils/
│   │       └── hash.js
│   └── package.json
│
└── README.md

---

## How to Run Locally

### Start Backend

cd backend
npm install
npm start

Backend runs at:
http://localhost:5000

---

### Start Frontend

cd frontend
npm install
npm run dev

Frontend runs at:
http://localhost:5173

---

## Data Persistence (Real Permanence)

1. User edits a PDF and fills fields
2. Field metadata is stored as JSON:
   - type
   - value
   - xPercent, yPercent, wPercent, hPercent
3. Data is sent to backend via:
   POST /documents/save
4. MongoDB stores the document state
5. On reload, fields are restored using:
   GET /documents/:pdfId

---

## Signing and Audit Flow

1. Compute SHA-256 hash of original PDF
2. Embed fields and signature into PDF using pdf-lib
3. Compute SHA-256 hash of signed PDF
4. Store both hashes in MongoDB
5. Return signed PDF URL to the client

---

## API Overview

Save Document:
POST /documents/save

Payload:
{
  "pdfId": "sample-pdf",
  "fields": [...]
}

Load Document:
GET /documents/:pdfId

Sign PDF:
POST /sign-pdf

Payload:
{
  "pdfId": "sample-pdf",
  "signatureBase64": "data:image/png;base64,...",
  "coordinates": {
    "xPercent": 0.32,
    "yPercent": 0.55,
    "wPercent": 0.2,
    "hPercent": 0.08
  }
}

---

## Demo Walkthrough (Suggested)

- Upload a PDF
- Drag and drop fields
- Fill and lock values
- Switch between desktop and mobile view
- Save document
- Reload and verify persistence
- Sign and download final PDF

---

## Assumptions

- Single-page PDF for prototype
- MongoDB running locally or via Atlas
- Authentication not included

---

## Future Enhancements

- Multi-page PDF support
- User authentication
- Role-based signing
- Real-time collaboration
- Certificate-based digital signatures

---

## Author

Meghana Tamrakar  
Full Stack Developer (MERN)

---

## Final Note

This project prioritizes correctness, reliability, and real-world document-signing behavior, focusing on production-grade logic rather than UI-only demonstrations.
