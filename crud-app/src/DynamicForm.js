import React, { useState, useEffect } from "react";
import FieldGroup from "./FieldGroup";
import "./index.css"; // Import the CSS file

const DynamicForm = ({ onSubmit }) => {
  const [schema, setSchema] = useState({});
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchSchema = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/schema");
        const schemaData = await response.json();
        setSchema(schemaData);
      } catch (error) {
        console.error("Error fetching schema:", error);
      }
    };

    fetchSchema();
  }, []);

  useEffect(() => {
    const initialFormData = {};
    Object.keys(schema).forEach((key) => {
      initialFormData[key] = Array.isArray(schema[key]) ? [] : "";
    });
    setFormData(initialFormData);
  }, [schema]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFieldGroupChange = (name, values) => {
    setFormData({ ...formData, [name]: values });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        {schema &&
          Object.keys(schema).map((key) => (
            <div key={key}>
              <label>{key}:</label>
              {Array.isArray(schema[key]) ? (
                <FieldGroup
                  value={formData[key]}
                  onChange={(values) => handleFieldGroupChange(key, values)}
                />
              ) : (
                <input
                  type="text"
                  name={key}
                  value={formData[key] || ""}
                  onChange={handleChange}
                  required
                />
              )}
            </div>
          ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DynamicForm;
