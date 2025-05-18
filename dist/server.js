"use strict";
const express = require('express');
//const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;
app.use(cors());
// Path to your JSON file
const jsonFilePath = path.join(__dirname, '../json/characters.json');
// this will read from the json file
app.get('/api/characters', (req, res) => {
    const data = fs.readFileSync(jsonFilePath, 'utf-8'); // get the data from the json file
    res.json(JSON.parse(data)); // send the character data back as a response
});
app.post('/api/characters', (req, res) => {
    fs.writeFileSync(jsonFilePath, JSON.stringify(req.body, null, 2), 'utf-8'); // write the new data into the json file
    res.send('Characters updated'); // send a response saying that the file was updated
});
