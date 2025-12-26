import Toolbar from "./components/Toolbar";
import PdfCanvas from "./components/PdfCanvas";
import { useResponsiveFields } from "./components/useResponsiveFields";

export default function App() {
  const { fields, addField, updateField } = useResponsiveFields();

  return (
    <div className="app">
      <Toolbar onAdd={addField} />
      <PdfCanvas fields={fields} onUpdate={updateField} />
    </div>
  );
}
