const { exec } = require("child_process");
const path = require("path");

// Function to run shell commands
const runCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${stderr}`);
        reject(error);
      } else {
        console.log(stdout);
        resolve(stdout);
      }
    });
  });
};

const main = async () => {
  // Check for correct number of arguments
  if (process.argv.length !== 4) {
    console.error("Usage: node main.js <jsonFilePath> <collectionName>");
    process.exit(1);
  }

  const jsonFilePath = process.argv[2]; // First argument: the JSON file path
  const collectionName = process.argv[3]; // Second argument: the collection name

  try {
    // Step 1: Run schemaConvert.js to generate schema.json
    console.log(`Generating schema.json from ${jsonFilePath}...`);
    const schemaConvertCommand = `node schemaConvert.js ${jsonFilePath}`;
    await runCommand(schemaConvertCommand);

    // Step 2: Run crudGen.js to generate CRUD operations
    console.log(`Generating CRUD for collection '${collectionName}'...`);
    const crudGenCommand = `node crudGen.js ${collectionName}`;
    await runCommand(crudGenCommand);

    console.log("All operations completed successfully.");
  } catch (error) {
    console.error("An error occurred:", error.message);
    process.exit(1);
  }
};

main();
