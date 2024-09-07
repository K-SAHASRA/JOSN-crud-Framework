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

// Main function to handle command-line arguments and generate schema
const main = () => {
  if (process.argv.length !== 3) {
    console.error("Usage: node generate-schema.js <jsonFilePath>");
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

      // Write the schema to a file (optional)
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
