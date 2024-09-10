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
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory

// const DynamicItemList = () => {
//   const [items, setItems] = useState([]);
//   const [schema, setSchema] = useState(null);
//   const navigate = useNavigate(); // Initialize useNavigate

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
//               <button onClick={() => navigate(`/update/${item._id || item.id}`)}> {/* Replace history.push with navigate */}
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
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DynamicItemList = () => {
  const [items, setItems] = useState([]);
  const [schema, setSchema] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemsResponse = await fetch('http://localhost:5000/api/items');
        const schemaResponse = await fetch('http://localhost:5000/api/schema');
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

  const handleUpdate = (item) => {
    navigate(`/update/${item._id || item.id}`, { state: { item } });
  };

  return (
    <div>
      <h2>Select an Item to Update</h2>
      {items.length > 0 && schema ? (
        <ul>
          {items.map((item) => (
            <li key={item._id || item.id}>
              {Object.keys(schema).map((key) => (
                <span key={key}>{key}: {item[key]}, </span>
              ))}
              <button onClick={() => handleUpdate(item)}>Update</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DynamicItemList;
