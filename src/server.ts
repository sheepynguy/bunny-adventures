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
app.get('/api/characters', (req: any, res: any) => {
    const data = fs.readFileSync(jsonFilePath, 'utf-8');    // get the data from the json file
    res.json(JSON.parse(data)); // send the character data back as a response
});


let char_count = 0;
app.post('/api/characters', (req: any, res:any) => {
    console.log("POST /api/characters hit");
    const character = req.body;

    const data = fs.readFileSync(jsonFilePath, 'utf-8');    // get the data from the json file
    const json = JSON.parse(data);
    json[char_count] = {
        name: character.name,
        class: character.class,
        health: character.health,
        attack: character.attack,
        inventory: character.inventory || []
    };
    char_count++;

    fs.writeFileSync(jsonFilePath, JSON.stringify(json, null, 2));
    res.status(201).json({message: 'Character added successfully'});
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

app.use((req:any , res: any) => {
  console.warn("Unhandled route:", req.method, req.url);
  res.status(404).send("Route not found");
});
