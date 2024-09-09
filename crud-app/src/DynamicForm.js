import React, { useState, useEffect } from "react";
import FieldGroup from "./FieldGroup"; // Reuse FieldGroup for array fields

// TODO : create form overwrites as soon as you write something

const DynamicForm = ({ initialData = {}, onSubmit }) => {
  const [schema, setSchema] = useState({});
  const [formData, setFormData] = useState({});

  // Fetch schema on mount
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

  // Initialize formData based on initialData or schema
  useEffect(() => {
    if (Object.keys(schema).length > 0) {
      const defaultValues = {};
      Object.keys(schema).forEach((key) => {
        defaultValues[key] =
          initialData[key] !== undefined
            ? initialData[key]
            : Array.isArray(schema[key])
            ? []
            : "";
      });
      setFormData(defaultValues);
    }
  }, [initialData, schema]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFieldGroupChange = (name, values) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: values,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pass final form data to parent
  };

  return (
    <form onSubmit={handleSubmit} style={formStyles}>
      {Object.keys(schema).map((key) => (
        <div key={key} style={fieldWrapperStyle}>
          <label style={labelStyle}>{key}:</label>
          {Array.isArray(schema[key]) ? (
            <FieldGroup
              value={formData[key] || []} // Handle array fields
              onChange={(values) => handleFieldGroupChange(key, values)}
            />
          ) : (
            <input
              type="text"
              name={key}
              value={formData[key] || ""} // Controlled component pattern
              onChange={handleChange}
              required
              style={inputStyle}
            />
          )}
        </div>
      ))}
      <button type="submit" style={buttonStyle}>
        Submit
      </button>
    </form>
  );
};

// Basic inline styles
const formStyles = {
  display: "flex",
  flexDirection: "column",
  padding: "20px",
  maxWidth: "500px",
  margin: "0 auto",
  border: "1px solid #ccc",
  borderRadius: "8px",
  backgroundColor: "#f9f9f9",
};

const fieldWrapperStyle = {
  marginBottom: "15px",
  display: "flex",
  flexDirection: "column",
};

const labelStyle = {
  marginBottom: "5px",
  fontWeight: "bold",
};

const inputStyle = {
  padding: "10px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  fontSize: "16px",
};

const buttonStyle = {
  padding: "10px 15px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "16px",
  marginTop: "10px",
};

export default DynamicForm;
