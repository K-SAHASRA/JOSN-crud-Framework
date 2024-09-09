import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DynamicForm from "./DynamicForm"; // Reuse DynamicForm component

const Update = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null); // Hold formData in Update

  useEffect(() => {
    if (location.state && location.state.item) {
      setFormData(location.state.item); // Initialize formData with the item to update
    }
  }, [location]);

  const handleUpdateSubmit = async (updatedFormData) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/userCollection/${
          updatedFormData._id || updatedFormData.id
        }`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFormData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update item");
      }

      alert("Item successfully updated!");
      navigate("/read"); // Navigate to the listing page after successful update
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update item");
    }
  };

  return (
    <div>
      <h2>Update Item</h2>
      {/* Only render the form once formData is available */}
      {formData && (
        <DynamicForm
          initialData={formData} // Pass existing data to DynamicForm
          onSubmit={handleUpdateSubmit} // Pass update handler to DynamicForm
        />
      )}
    </div>
  );
};

export default Update;
