import { useState } from "react";

export function useResponsiveFields() {
  const [fields, setFields] = useState([]);

  const addField = type => {
    setFields(f => [
      ...f,
      {
        id: crypto.randomUUID(),
        type,
        xPercent: 0.3,
        yPercent: 0.3,
        wPercent: 0.25,
        hPercent: 0.07
      }
    ]);
  };

  const updateField = (id, updates) => {
    setFields(f =>
      f.map(field =>
        field.id === id ? { ...field, ...updates } : field
      )
    );
  };

  return { fields, addField, updateField };
}
