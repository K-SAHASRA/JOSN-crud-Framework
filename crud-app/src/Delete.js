import React, { useState, useEffect } from "react";

const Delete = () => {
  const [items, setItems] = useState([]);
  const [schema, setSchema] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemsResponse = await fetch("http://localhost:5000/api/items");
        const schemaResponse = await fetch("http://localhost:5000/api/schema");
        const itemsData = await itemsResponse.json();
        const schemaData = await schemaResponse.json();
        setItems(itemsData);
        setSchema(schemaData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (itemId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/${process.env.COLLECTION}/${itemId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      // Remove the deleted item from the UI
      setItems(
        items.filter((item) => item._id !== itemId && item.id !== itemId)
      );

      alert("Item successfully deleted!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to delete item");
    }
  };

  return (
    <div>
      <h2>Delete Items</h2>
      {items.length > 0 && schema ? (
        <ul>
          {items.map((item) => (
            <li key={item._id || item.id}>
              {Object.keys(schema).map((key) => (
                <span key={key}>
                  {key}: {item[key]},{" "}
                </span>
              ))}
              <button onClick={() => handleDelete(item._id || item.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Delete;
