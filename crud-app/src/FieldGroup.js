import React, { useState, useEffect } from "react";

const FieldGroup = ({ value = [], onChange }) => {
  const [fields, setFields] = useState(value.length > 0 ? value : [""]);

  // When the parent passes new value (from formData), update the local state
  useEffect(() => {
    setFields(value.length > 0 ? value : [""]);
  }, [value]);

  const addField = () => {
    const newFields = [...fields, ""];
    setFields(newFields);
    onChange(newFields); // Notify the parent of the updated array
  };

  const handleInputChange = (index, event) => {
    const newFields = [...fields];
    newFields[index] = event.target.value;
    setFields(newFields);
    onChange(newFields); // Notify the parent of the updated array
  };

  return (
    <div>
      {fields.map((field, index) => (
        <div key={index}>
          <input
            type="text"
            value={field}
            onChange={(e) => handleInputChange(index, e)}
          />
        </div>
      ))}
      <button type="button" onClick={addField}>
        +
      </button>
    </div>
  );
};

export default FieldGroup;
