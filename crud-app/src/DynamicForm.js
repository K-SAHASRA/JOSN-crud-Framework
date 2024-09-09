import React, { useState, useEffect } from "react";

const DynamicForm = ({ onSubmit }) => {
  const [schema, setSchema] = useState({});
  const [formData, setFormData] = useState({});

  // Fetch schema on mount
  useEffect(() => {
    const fetchSchema = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/schema");
        const schemaData = await response.json();
        console.log("Schema fetched:", schemaData);  // Log the fetched schema
        setSchema(schemaData);
      } catch (error) {
        console.error("Error fetching schema:", error);
      }
    };
  
    fetchSchema();
  }, []);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const initialFormData = {};
    Object.keys(schema).forEach(key => {
      initialFormData[key] = '';
    });
    setFormData(initialFormData);
  }, [schema]); // Ensure this effect runs when schema is set
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);  // Call parent onSubmit handler with the form data
  };

  return (
    <form onSubmit={handleSubmit}>
  {schema && Object.keys(schema).map((key) => (
    <div key={key}>
      <label>{key}:</label>
      <input
        type="text"  // Consider adjusting type based on schema type if needed
        name={key}
        value={formData[key] || ""}
        onChange={handleChange}
        required
      />
    </div>
  ))}
  <button type="submit">Submit</button>
</form>

  );
};

export default DynamicForm;
