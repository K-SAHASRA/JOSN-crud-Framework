
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');



// Initialize Express app
const app = express();
const port = 5000; // Define your port here

app.use(cors());

// Middleware
app.use(bodyParser.json());

// Serve the schema
app.get('/api/schema', (req, res) => {
    fs.readFile('schema.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading schema');
        }
        res.send(JSON.parse(data));
    });
});


app.get('/api/items', async (req, res) => {
    try {
        const items = await userCollection.find(); // Use the dynamically defined model
        res.json(items);
    } catch (error) {
        res.status(500).send('Server error');
    }
});


// Define the schema for userCollection
const userCollectionSchema = new mongoose.Schema({
  "id": "Number",
  "name": "String",
  "course": "String",
  "hobbies": [
    "String"
  ],
  "age": "String",
  "department": "String"
});
const userCollection = mongoose.model('userCollection', userCollectionSchema);

// CRUD operations
// Create
app.post('/api/userCollection', async (req, res) => {
    try {
        const newItem = new userCollection(req.body);
        await newItem.save();
        res.status(201).send(newItem);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Read all
app.get('/api/userCollection', async (req, res) => {
    try {
        const items = await userCollection.find();
        res.status(200).send(items);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Read one
app.get('/api/userCollection/:id', async (req, res) => {
    try {
        const item = await userCollection.findById(req.params.id);
        if (!item) {
            return res.status(404).send('Item not found');
        }
        res.status(200).send(item);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Update
app.put('/api/userCollection/:id', async (req, res) => {
    try {
        const item = await userCollection.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!item) {
            return res.status(404).send('Item not found');
        }
        res.status(200).send(item);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete
app.delete('/api/userCollection/:id', async (req, res) => {
    try {
        const item = await userCollection.findByIdAndDelete(req.params.id);
        if (!item) {
            return res.status(404).send('Item not found');
        }
        res.status(200).send(item);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Database connection
mongoose.connect('mongodb://127.0.0.1:27017/json-crud-framework', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
