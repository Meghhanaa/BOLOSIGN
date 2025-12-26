import { Document, Page, pdfjs } from "react-pdf";
import { Rnd } from "react-rnd";
import { useState, useEffect } from "react";

pdfjs.GlobalWorkerOptions.workerSrc =
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PdfViewer() {
  const [box, setBox] = useState({
    x: 120,
    y: 160,
    width: 180,
    height: 60
  });

  const [pageWidth, setPageWidth] = useState(600);

  // Responsive PDF width
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
    <div style={styles.page}>
      <div style={{ ...styles.card, width: pageWidth }}>
        <Document file="/sample.pdf">
          <Page pageNumber={1} width={pageWidth} />
        </Document>

        <Rnd
          bounds="parent"
          size={{ width: box.width, height: box.height }}
          position={{ x: box.x, y: box.y }}
          onDragStop={(e, d) => setBox({ ...box, x: d.x, y: d.y })}
          onResizeStop={(e, dir, ref, delta, pos) =>
            setBox({
              width: ref.offsetWidth,
              height: ref.offsetHeight,
              ...pos
            })
          }
          style={styles.signatureBox}
        >
          <span style={styles.signatureText}>Signature</span>
        </Rnd>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #f5f7fb, #e6e9f2)",
    padding: "20px"
  },

  card: {
    position: "relative",
    background: "#ffffff",
    padding: "14px",
    borderRadius: "16px",
    boxShadow: "0 18px 45px rgba(0,0,0,0.12)",
    overflow: "auto"
  },

  signatureBox: {
    border: "2px dashed #2563eb",
    background: "rgba(37, 99, 235, 0.12)",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "grab",
    transition: "all 0.2s ease",
    userSelect: "none"
  },

  signatureText: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1e3a8a",
    pointerEvents: "none"
  }
};


// import { Document, Page, pdfjs } from "react-pdf";
// import { Rnd } from "react-rnd";
// import { useState } from "react";

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// export default function PdfViewer() {
//   const [box, setBox] = useState({
//     x: 120,
//     y: 160,
//     width: 180,
//     height: 60
//   });

//   return (
//     <div style={{ position: "relative", width: "600px" }}>
//       <Document file="/sample.pdf">
//         <Page pageNumber={1} width={600} />
//       </Document>

//       <Rnd
//         bounds="parent"
//         size={{ width: box.width, height: box.height }}
//         position={{ x: box.x, y: box.y }}
//         onDragStop={(e, d) => setBox({ ...box, x: d.x, y: d.y })}
//         onResizeStop={(e, dir, ref, delta, pos) =>
//           setBox({
//             width: ref.offsetWidth,
//             height: ref.offsetHeight,
//             ...pos
//           })
//         }
//         style={{
//           border: "2px dashed #1976d2",
//           background: "rgba(25, 118, 210, 0.1)",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center"
//         }}
//       >
//         Signature
//       </Rnd>
//     </div>
//   );
// }
