// import React, { useState, useEffect } from "react";

// const Update = () => {
//   const [formData, setFormData] = useState({});
//   const [itemId, setItemId] = useState("");
//   const [schema, setSchema] = useState({});

//   useEffect(() => {
//     // Fetch schema on mount
//     const fetchSchema = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/schema");
//         const schemaData = await response.json();
//         setSchema(schemaData);
//       } catch (error) {
//         console.error("Error fetching schema:", error);
//       }
//     };

//     fetchSchema();
//   }, []);

//   const handleFetch = async () => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/userCollection/${itemId}`);
//       const data = await response.json();
//       setFormData(data);
//     } catch (error) {
//       console.error("Error fetching item:", error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`http://localhost:5000/api/userCollection/${itemId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to update item");
//       }

//       alert("Item successfully updated!");
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Failed to update item");
//     }
//   };

//   return (
//     <div>
//       <h2>Update Item</h2>
//       <input
//         type="text"
//         placeholder="Enter Item ID"
//         value={itemId}
//         onChange={(e) => setItemId(e.target.value)}
//       />
//       <button onClick={handleFetch}>Fetch Item</button>

//       <form onSubmit={handleSubmit}>
//         {Object.keys(schema).map((key) => (
//           <div key={key}>
//             <label>{key}:</label>
//             <input
//               type="text"
//               name={key}
//               value={formData[key] || ""}
//               onChange={handleChange}
//               required
//             />
//           </div>
//         ))}
//         <button type="submit">Update</button>
//       </form>
//     </div>
//   );
// };

// export default Update;
// import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';

// const DynamicItemList = () => {
//   const [items, setItems] = useState([]);
//   const [schema, setSchema] = useState(null);
//   const history = useHistory(); // To programmatically navigate to another route

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const itemsResponse = await fetch('http://localhost:5000/api/items');
//         const schemaResponse = await fetch('http://localhost:5000/api/schema');
//         const itemsData = await itemsResponse.json();
//         const schemaData = await schemaResponse.json();
//         setItems(itemsData);
//         setSchema(schemaData);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h2>Select an Item to Update</h2>
//       {items.length > 0 && schema ? (
//         <ul>
//           {items.map((item) => (
//             <li key={item._id || item.id}>
//               {Object.keys(schema).map((key) => (
//                 <span key={key}>{key}: {item[key]}, </span>
//               ))}
//               <button onClick={() => history.push(`/update/${item._id || item.id}`)}>
//                 Update
//               </button>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default DynamicItemList;
// import React, { useState, useEffect } from "react";

// const Update = () => {
//   const [formData, setFormData] = useState({});
//   const [itemId, setItemId] = useState("");
//   const [schema, setSchema] = useState({});

//   useEffect(() => {
//     // Fetch schema on mount
//     const fetchSchema = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/schema");
//         const schemaData = await response.json();
//         setSchema(schemaData);
//       } catch (error) {
//         console.error("Error fetching schema:", error);
//       }
//     };

//     fetchSchema();
//   }, []);

//   const handleFetch = async () => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/userCollection/${itemId}`);
//       const data = await response.json();
//       setFormData(data); // Populate form with fetched data
//     } catch (error) {
//       console.error("Error fetching item:", error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`http://localhost:5000/api/userCollection/${itemId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to update item");
//       }

//       alert("Item successfully updated!");
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Failed to update item");
//     }
//   };

//   return (
//     <div>
//       <h2>Update Item</h2>
//       <input
//         type="text"
//         placeholder="Enter Item ID"
//         value={itemId}
//         onChange={(e) => setItemId(e.target.value)}
//       />
//       <button onClick={handleFetch}>Fetch Item</button>

//       {Object.keys(schema).length > 0 && (
//         <form onSubmit={handleSubmit}>
//           {Object.keys(schema).map((key) => (
//             <div key={key}>
//               <label>{key}:</label>
//               <input
//                 type="text"
//                 name={key}
//                 value={formData[key] || ""}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           ))}
//           <button type="submit">Update</button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default Update;
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

const Update = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [schema, setSchema] = useState({});

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

    if (location.state && location.state.item) {
      setFormData(location.state.item);
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/userCollection/${formData._id || formData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update item");
      }

      alert("Item successfully updated!");
      navigate('/read'); // Navigate back after successful update
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update item");
    }
  };

  return (
    <div>
      <h2>Update Item</h2>

      <form onSubmit={handleSubmit}>
        {Object.keys(schema).map((key) => (
          <div key={key}>
            <label>{key}:</label>
            <input
              type="text"
              name={key}
              value={formData[key] || ""}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default Update;
