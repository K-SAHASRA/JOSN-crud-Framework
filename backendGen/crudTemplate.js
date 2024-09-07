// crud-template.js

const template = (collectionName, schema) => `
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();
const port = 3000; // or any port you prefer

// Middleware
app.use(bodyParser.json());

// Define the schema
const ${collectionName}Schema = new mongoose.Schema(${JSON.stringify(
  schema,
  null,
  2
)});
const ${collectionName} = mongoose.model('${collectionName}', ${collectionName}Schema);

// CRUD operations
// Create
app.post('/api/${collectionName}', async (req, res) => {
    try {
        const newItem = new ${collectionName}(req.body);
        await newItem.save();
        res.status(201).send(newItem);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Read all
app.get('/api/${collectionName}', async (req, res) => {
    try {
        const items = await ${collectionName}.find();
        res.status(200).send(items);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Read one
app.get('/api/${collectionName}/:id', async (req, res) => {
    try {
        const item = await ${collectionName}.findById(req.params.id);
        if (!item) {
            return res.status(404).send('Item not found');
        }
        res.status(200).send(item);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Update
app.put('/api/${collectionName}/:id', async (req, res) => {
    try {
        const item = await ${collectionName}.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!item) {
            return res.status(404).send('Item not found');
        }
        res.status(200).send(item);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete
app.delete('/api/${collectionName}/:id', async (req, res) => {
    try {
        const item = await ${collectionName}.findByIdAndDelete(req.params.id);
        if (!item) {
            return res.status(404).send('Item not found');
        }
        res.status(200).send(item);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Database connection
mongoose.connect('mongodb://localhost:27017/json-crud-framework', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

// Start the server
app.listen(port, () => {
    console.log(\`Server is running on http://localhost:3000\`);
});
`;

module.exports = template;
