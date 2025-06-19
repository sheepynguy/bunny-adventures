"use strict";
const express = require('express');
//const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 5001;
app.use(cors());
app.use(express.json()); // <--- Add this line!
// Path to your JSON file
const jsonFilePath = path.join(__dirname, '../json/characters.json');
// this will read from the json file
app.get('/api/characters', (req, res) => {
    const data = fs.readFileSync(jsonFilePath, 'utf-8'); // get the data from the json file
    res.json(JSON.parse(data)); // send the character data back as a response
});
/*
This function makes changes to the character.json file based on the following functions:
    set_class -> adds a new character into the character.json
    add_inventory -> adds an item into the invetory of an existing character

*/
let char_count = 0;
app.post('/api/characters', (req, res) => {
    console.log("POST /api/characters hit");
    const character = req.body;
    const data = fs.readFileSync(jsonFilePath, 'utf-8'); // get the data from the json file
    const json = JSON.parse(data);
    if (json[character.name] === undefined) { // if the character doesn't exist; aka a new character
        json[char_count] = {
            name: character.name,
            class: character.class,
            health: character.health,
            attack: character.attack,
            inventory: character.inventory || []
        };
        char_count++;
    }
    fs.writeFileSync(jsonFilePath, JSON.stringify(json, null, 2));
    res.status(201).json({ message: 'Character added successfully' });
});
app.get('/api/inventory', (req, res) => {
    const data = fs.readFileSync(jsonFilePath, 'utf-8'); // get the data from the json file
    res.json(JSON.parse(data)); // send the character data back as a response
});
app.patch('/api/inventory', (req, res) => {
    console.log("POST /api/inventory hit");
    const character = req.body;
    const data = fs.readFileSync(jsonFilePath, 'utf-8'); // get the character data from the json file
    const json = JSON.parse(data);
    let i = 0;
    for (; i < char_count; i++) { // update the character's inventory if the character is found
        if (json[i].name === character.name) {
            json[i] = Object.assign(Object.assign({}, json[i]), character);
        }
    }
    fs.writeFileSync(jsonFilePath, JSON.stringify(json, null, 2));
    res.status(201).json({ message: 'Item added successfully' });
});
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
app.use((req, res) => {
    console.warn("Unhandled route:", req.method, req.url);
    res.status(404).send("Route not found");
});
2;
