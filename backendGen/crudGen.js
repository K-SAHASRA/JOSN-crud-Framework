const fs = require("fs");
const path = require("path");
const template = require("./crudTemplate");

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
  // Create the folder named after collectionName
  const collectionDir = path.join(__dirname, collectionName);

  if (!fs.existsSync(collectionDir)) {
    fs.mkdirSync(collectionDir, { recursive: true });
  }

  // Path for the generated JS file inside the new folder
  const outputFilePath = path.join(collectionDir, `${collectionName}.js`);

  const crudCode = template(collectionName, schema);

  fs.writeFile(outputFilePath, crudCode, (err) => {
    if (err) {
      console.error("Error writing file:", err);
    } else {
      console.log(
        `CRUD operations for collection '${collectionName}' generated successfully.`
      );
      console.log(
        `Run 'node ${path.join(
          collectionName,
          `${collectionName}.js`
        )}' to start the server.`
      );
    }
  });
};

// Main function to handle command-line arguments and generate CRUD
const main = async () => {
  if (process.argv.length !== 3) {
    console.error("Usage: node generate-crud.js <collectionName>");
    process.exit(1);
  }

  const collectionName = process.argv[2];
  const schemaFilePath = path.join(__dirname, "schema.json"); // Always use 'schema.json'

  try {
    const schema = await readSchemaFromFile(schemaFilePath);
    generateCRUD(collectionName, schema);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};

main();
