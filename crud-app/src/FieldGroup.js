import React, { useState, useEffect } from "react";
import "./index.css"; // Import the CSS file

const FieldGroup = ({ value = [], onChange }) => {
  const [fields, setFields] = useState(value.length > 0 ? value : [""]);

  useEffect(() => {
    setFields(value.length > 0 ? value : [""]);
  }, [value]);

  const addField = () => {
    const newFields = [...fields, ""];
    setFields(newFields);
    onChange(newFields);
  };

  const handleInputChange = (index, event) => {
    const newFields = [...fields];
    newFields[index] = event.target.value;
    setFields(newFields);
    onChange(newFields);
  };

  return (
    <div className="field-group-container">
      <div className="field-group">
        {fields.map((field, index) => (
          <div key={index}>
            <input
              type="text"
              value={field}
              onChange={(e) => handleInputChange(index, e)}
            />
          </div>
        ))}
      </div>
      <div className="button-container">
        <button type="button" onClick={addField}>
          +
        </button>
      </div>
    </div>
  );
};

export default FieldGroup;
