// import React from "react";
import DynamicForm from "./DynamicForm";

const Create = () => {
  const handleCreate = async (formData, resetForm) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/${process.env.REACT_APP_COLLECTION}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
  
      if (!response.ok) {
        const errorText = await response.text();  // Fetch response body for more details
        console.log(`Error: ${response.statusText} - ${errorText}`);
        throw new Error(`Failed to create item: ${response.status} - ${response.statusText}`);
      }
  
      alert("Item successfully created!");
      resetForm();  // Call resetForm to clear the fields
    } catch (error) {
      console.error("Error:", error);
      alert(`Failed to create item: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Create Item</h2>
      <DynamicForm onSubmit={handleCreate} />
    </div>
  );
};

export default Create;
