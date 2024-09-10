import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FieldGroup from "./FieldGroup";
import "./index.css"; // Import the CSS file

const Update = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [schema, setSchema] = useState({});

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

    if (location.state && location.state.item) {
      setFormData(location.state.item);
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFieldGroupChange = (name, values) => {
    setFormData({ ...formData, [name]: values });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/${process.env.REACT_APP_COLLECTION}/${
          formData._id || formData.id
        }`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update item");
      }

      alert("Item successfully updated!");
      navigate("/read");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update item");
    }
  };

  return (
    <div className="form-container">
      <h2>Update Item</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(schema).map((key) => (
          <div key={key}>
            <label>{key}:</label>
            {Array.isArray(schema[key]) ? (
              <FieldGroup
                value={formData[key] || []}
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
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default Update;
