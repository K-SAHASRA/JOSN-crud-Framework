import React from "react";
import DynamicForm from "./DynamicForm";

const Create = () => {
  const handleCreate = async (formData) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/${process.env.COLLECTION}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create item");
      }

      alert("Item successfully created!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create item");
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
