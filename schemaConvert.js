const fs = require("fs");

// Function to determine the data type of a field
const determineType = (value) => {
  if (Array.isArray(value)) {
    return "array";
  }
  if (value === null) {
    return "null";
  }
  return typeof value;
};

// Function to generate schema from JSON data
const generateSchema = (jsonData) => {
  const schema = {};

  for (const key in jsonData) {
    if (jsonData.hasOwnProperty(key)) {
      const value = jsonData[key];
      schema[key] = determineType(value);
    }
  }

  return schema;
};

// Read JSON data from a file (assuming 'data.json' as input)
fs.readFile("data.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  try {
    const jsonData = JSON.parse(data);
    const schema = generateSchema(jsonData);
    console.log("Generated Schema:", schema);

    // Write the schema to a file (optional)
    fs.writeFile("schema.json", JSON.stringify(schema, null, 2), (err) => {
      if (err) {
        console.error("Error writing schema to file:", err);
      } else {
        console.log("Schema saved to schema.json");
      }
    });
  } catch (parseErr) {
    console.error("Error parsing JSON data:", parseErr);
  }
});
