import { Document, Page, pdfjs } from "react-pdf";
import Field from "./Field";
import { useEffect, useState } from "react";

pdfjs.GlobalWorkerOptions.workerSrc =
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PdfCanvas({ fields, onUpdate }) {
  const [pageWidth, setPageWidth] = useState(600);

  // Responsive PDF width handling
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setPageWidth(window.innerWidth - 40);
      } else {
        setPageWidth(600);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={styles.canvas}>
      <div style={{ ...styles.pdfWrapper, width: pageWidth }}>
        <Document file="/sample.pdf">
          <Page pageNumber={1} width={pageWidth} />
        </Document>

        {fields.map(field => (
          <Field
            key={field.id}
            field={field}
            onUpdate={onUpdate}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  /* Main canvas area */
  canvas: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "8px",                     // 👈 less top/bottom gap
    background: "linear-gradient(180deg, #f7f9fc, #eef2f8)",
    overflowY: "auto",
    minHeight: "100vh"
  },

  /* PDF card wrapper */
  pdfWrapper: {
    position: "relative",
    background: "#ffffff",
    padding: "6px",                     // 👈 tight document feel
    borderRadius: "14px",
    boxShadow: `
      0 10px 25px rgba(0, 0, 0, 0.08),
      0 30px 60px rgba(0, 0, 0, 0.06)
    `,
    overflow: "hidden",
    transition: "all 0.25s ease"
  }
};

