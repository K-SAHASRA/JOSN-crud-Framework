const fs = require("fs");
const path = require("path");
const template = require("./crud-template");

// Function to read schema from a JSON file
const readSchemaFromFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        try {
          const schema = JSON.parse(data);
          resolve(schema);
        } catch (parseErr) {
          reject(parseErr);
        }
      }
    });
  });
};

// Function to generate CRUD code
const generateCRUD = (collectionName, schema) => {
  const crudCode = template(collectionName, schema);
  const outputFilePath = path.join(__dirname, `${collectionName}-crud.js`);

  fs.writeFile(outputFilePath, crudCode, (err) => {
    if (err) {
      console.error("Error writing file:", err);
    } else {
      console.log(
        `CRUD operations for collection '${collectionName}' generated successfully.`
      );
      console.log(`Run 'node ${collectionName}-crud.js' to start the server.`);
    }
  });
};

// Main function to handle command-line arguments and generate CRUD
const main = async () => {
  if (process.argv.length !== 4) {
    console.error(
      "Usage: node generate-crud.js <collectionName> <schemaFilePath>"
    );
    process.exit(1);
  }

  const collectionName = process.argv[2];
  const schemaFilePath = process.argv[3];

  try {
    const schema = await readSchemaFromFile(schemaFilePath);
    generateCRUD(collectionName, schema);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};

main();
