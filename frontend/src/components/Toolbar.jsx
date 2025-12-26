const tools = [
  { type: "text", label: "Text" },
  { type: "signature", label: "Signature" },
  { type: "image", label: "Image" },
  { type: "date", label: "Date" },
  { type: "radio", label: "Radio" }
];

export default function Toolbar({ onAdd }) {
  return (
    <div style={styles.toolbar}>
      <h3 style={styles.heading}>Fields</h3>

      {tools.map(t => (
        <div
          key={t.type}
          style={styles.tool}
          onClick={() => onAdd(t.type)}
          onMouseEnter={e =>
            (e.currentTarget.style.background = "#e0e7ff")
          }
          onMouseLeave={e =>
            (e.currentTarget.style.background = "#f1f3f6")
          }
        >
          {t.label}
        </div>
      ))}
    </div>
  );
}

const styles = {
  toolbar: {
    width: "240px",
    minHeight: "100vh",
    background: "#ffffff",
    padding: "20px",
    boxShadow: "4px 0 20px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    position: "sticky",
    top: 0
  },

  heading: {
    marginBottom: "16px",
    fontSize: "18px",
    fontWeight: "600",
    color: "#1e293b"
  },

  tool: {
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "10px",
    background: "#f1f3f6",
    textAlign: "center",
    cursor: "pointer",
    fontWeight: "500",
    color: "#1f2937",
    transition: "all 0.2s ease",
    userSelect: "none"
  }
};
