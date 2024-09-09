import React, { useState, useEffect } from "react";

const Read = () => {
  const [items, setItems] = useState([]);
  const [schema, setSchema] = useState({});

  useEffect(() => {
    // Fetch schema and items
    const fetchData = async () => {
      try {
        // Fetch schema
        const schemaResponse = await fetch("http://localhost:5000/api/schema");
        const schemaData = await schemaResponse.json();
        setSchema(schemaData);

        // Fetch items
        const itemsResponse = await fetch("http://localhost:5000/api/userCollection"); // Replace with your actual collection name
        const itemsData = await itemsResponse.json();
        setItems(itemsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Items List</h2>
      <table className="table">
        <thead>
          <tr>
            {Object.keys(schema).map((field) => (
              <th key={field}>{field}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              {Object.keys(schema).map((field) => (
                <td key={field}>{Array.isArray(item[field]) ? item[field].join(", ") : item[field]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Read;
