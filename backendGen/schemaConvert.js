const fs = require("fs");

// Function to determine the data type of a field
const determineType = (value) => {
  if (Array.isArray(value)) {
    if (value.length > 0) {
      return [determineType(value[0])]; // Handle arrays with known item type
    }
    return []; // Empty array case
  }
  if (value === null) {
    return "Mixed"; // Use Mixed for null or undefined
  }
  switch (typeof value) {
    case 'string': return 'String';
    case 'number': return 'Number';
    case 'boolean': return 'Boolean';
    case 'object': 
      if (value instanceof Date) return 'Date'; // Handle Date type
      return 'Object'; // For nested objects
    default: return 'Mixed'; // For unsupported types
  }
};

// Function to generate schema from JSON data
const generateSchema = (jsonData) => {
  if (jsonData.length === 0) return {}; // Return empty schema for empty data

  const schema = {};

  // Use the first item to determine the schema structure
  for (const key in jsonData[0]) {
    if (jsonData[0].hasOwnProperty(key)) {
      const value = jsonData[0][key];
      schema[key] = determineType(value);
    }
  }

  return schema;
};

// Main function to handle command-line arguments and generate schema
const main = () => {
  if (process.argv.length !== 3) {
    console.error("Usage: node schemaConvert.js <jsonFilePath>");
    process.exit(1);
  }

  const jsonFilePath = process.argv[2];

  // Read JSON data from the file provided as CLI argument
  fs.readFile(jsonFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      const schema = generateSchema(jsonData);
      console.log("Generated Schema:", schema);

      // Write the schema to a file
      const outputFilePath = "schema.json";
      fs.writeFile(outputFilePath, JSON.stringify(schema, null, 2), (err) => {
        if (err) {
          console.error("Error writing schema to file:", err);
        } else {
          console.log(`Schema saved to ${outputFilePath}`);
        }
      });
    } catch (parseErr) {
      console.error("Error parsing JSON data:", parseErr);
    }
  });
};

// Run the main function
main();
