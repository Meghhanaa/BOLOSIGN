import { Rnd } from "react-rnd";
import { useRef, useState } from "react";

export default function Field({ field, onUpdate }) {
  const parentWidth = 600;
  const parentHeight = 850;

  const [value, setValue] = useState(null);
  const [isCommitted, setIsCommitted] = useState(false);
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);

  // Commit on Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsCommitted(true);
    }
  };

  // Signature drawing
  const startDraw = (e) => {
    isDrawing.current = true;
    const ctx = canvasRef.current.getContext("2d");
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const draw = (e) => {
    if (!isDrawing.current) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const endDraw = () => {
    isDrawing.current = false;
    setValue(canvasRef.current.toDataURL());
  };

  const renderField = () => {
    switch (field.type) {
      case "text":
        return isCommitted ? (
          <div style={committedTextStyle}>{value || "Text"}</div>
        ) : (
          <input
            type="text"
            placeholder="Enter text"
            value={value || ""}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            style={inputStyle}
            autoFocus
          />
        );

      case "date":
        return isCommitted ? (
          <div style={committedTextStyle}>{value}</div>
        ) : (
          <input
            type="date"
            value={value || ""}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            style={inputStyle}
          />
        );

      case "radio":
        return (
          <input
            type="radio"
            checked={value === true}
            disabled={isCommitted}
            onChange={() => {
              setValue(true);
              setIsCommitted(true);
            }}
          />
        );

      case "image":
        return isCommitted && value ? (
          <img
            src={value}
            alt="uploaded"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        ) : (
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = () => {
                setValue(reader.result);
                setIsCommitted(true);
              };
              reader.readAsDataURL(file);
            }}
          />
        );

      case "signature":
        return isCommitted && value ? (
          <img
            src={value}
            alt="signature"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        ) : (
          <div style={{ textAlign: "center" }}>
            <canvas
              ref={canvasRef}
              width={200}
              height={60}
              onMouseDown={startDraw}
              onMouseMove={draw}
              onMouseUp={endDraw}
              onMouseLeave={endDraw}
              style={{
                border: "1px solid #ccc",
                background: "#fff",
                borderRadius: "6px"
              }}
            />
            <button
              onClick={() => setIsCommitted(true)}
              style={doneButtonStyle}
            >
              Done
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Rnd
      bounds="parent"
      size={{
        width: field.wPercent * parentWidth,
        height: field.hPercent * parentHeight
      }}
      position={{
        x: field.xPercent * parentWidth,
        y: field.yPercent * parentHeight
      }}
      onDragStop={(e, d) =>
        onUpdate(field.id, {
          xPercent: d.x / parentWidth,
          yPercent: d.y / parentHeight
        })
      }
      onResizeStop={(e, dir, ref, delta, pos) =>
        onUpdate(field.id, {
          wPercent: ref.offsetWidth / parentWidth,
          hPercent: ref.offsetHeight / parentHeight,
          xPercent: pos.x / parentWidth,
          yPercent: pos.y / parentHeight
        })
      }
      className="field"
    >
      {renderField()}
    </Rnd>
  );
}

const inputStyle = {
  width: "100%",
  height: "100%",
  border: "none",
  outline: "none",
  padding: "6px",
  fontSize: "14px"
};

const committedTextStyle = {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  padding: "6px",
  fontSize: "14px",
  fontWeight: "500",
  color: "#1e293b",
  userSelect: "none"
};

const doneButtonStyle = {
  marginTop: "6px",
  padding: "4px 10px",
  fontSize: "12px",
  borderRadius: "6px",
  border: "none",
  background: "#2563eb",
  color: "#fff",
  cursor: "pointer"
};
