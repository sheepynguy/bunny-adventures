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
app.get('/api/characters', (req: any, res: any) =>{
    const data = fs.readFileSync(jsonFilePath, 'utf-8');    // get the data from the json file
    res.json(JSON.parse(data)); // send the character data back as a response
});

app.post('/api/characters', (req: any, res:any) => {
    const character = req.body;

    const data = fs.readFileSync(jsonFilePath, 'utf-8');    // get the data from the json file
    const json = JSON.parse(data);
    json.characters[character.name] = {
        class: character.class,
        health: character.health,
        attack: character.attack,
        inventory: character.inventory || []
    };

    fs.writeFile(jsonFilePath, JSON.stringify(json, null, 2));
    res.status(201).json({message: 'Character added successfully'});
});