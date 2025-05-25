type ItemSet = {
    knight: string[];
    priest: string[];
    warrior: string[];
    archer: string[];
    mage: string[];
}


type Item = {
    name: string;
    count: number;
    image: string;
};

const ClassAvailable = ["knight", "priest", "warrior", "archer", "mage"] as const;  // if ItemSet updates, you also need to update this too
type Classtype = keyof ItemSet;

type Character = {
    name: string;
    class: Classtype;
    health: number;
    attack: number;
    inventory: Item[];
};

let characters: Record<number, Character> = {};
let items: Record<string, ItemSet> = {};

/*This function will launch the character creation box and set up the display*/
function launch_character_creation() {
    const cc_screen = document.getElementById("character-creation-screen") as HTMLDivElement;
    cc_screen.style.display = "block";

}

let temp: Character = {
    name: "",
    class: "knight",    // default to be a knight
    health: 0,
    attack: 0,
    inventory: []
}
/*This function will get the name typed from the input textbox and store it into a temporary space*/
function set_name(name: string){
    if(name.length === 0){
        return;
    }
    temp.name = name;

    // close the name box and progress the text box
    const name_box = document.getElementById("name-step") as HTMLDivElement;
    name_box.style.display = "none";
}

/*This function will receive the class selected and populate the health
  and attack stats for the character.
  Available classes are knight, warrior, priest, archer, mage
*/
function set_class(specialty: string){
    let health_low = 0, health_high = 0, attack_low = 0, attack_high = 0;
    let health, attack;
    switch(specialty){
        case("knight"):
            health_low = 60; health_high = 80;
            attack_low = 5; attack_high = 10;
            break;
        case("warrior"):
            health_low = 60; health_high = 70;
            attack_low = 8; attack_high = 10;
            break;
        case("priest"):
            health_low = 80; health_high = 100;
            attack_low = 3; attack_high = 5;
            break;
        case("archer"):
            health_low = 50; health_high = 60;
            attack_low = 3; attack_high = 5;
            break;
        case("mage"):
            health_low = 50; health_high = 60;
            attack_low = 5; attack_high = 10;
            break;
    }

    let i;
    for(i = 0; i < 5; i++){
        temp.health = health_low + Math.floor(Math.random() % health_high);
    }
    for(i = 0; i < 5; i++){
        temp.attack = attack_low + Math.floor(Math.random() % attack_high);
    }

    if((ClassAvailable as readonly string[]).includes(specialty)){  // if the string
        temp.class = specialty as Classtype;
    }
    const class_box = document.getElementById("class-step") as HTMLDivElement;
    class_box.style.display = "none";

    console.log("Sending character: ", temp);
    fetch("http://localhost:5001/api/characters", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(temp)
    })
    .then(res => res.json())
    .catch(err => console.error("Fetch failed: ", err));
    
}

/*
This function will receive an item name, the amount, and the character the item needs to be added to.
For any non-gold item that has an amount over 99, do not add. Return with an error message to console if this occurs.
If the character already has an item of this name in their inventory, add new amount to old and check against 99. Return an error message if overflow occurs.
All weapons can only occupy one spot. If there are duplicates of an item, put a copy marker of (#) inside.
For any character index that it not present in the JSON file, return with an error message to console.
*/
async function add_inventory(item: string, amount: number, character: number){
    const res = await fetch("http://localhost:5001/api/characters");    // wait for the characters fetch before moving on
    characters = await res.json();

    // single out the character if present. return if not present
    if(Object.keys(characters).length < character){
        return;
    }
    let char = characters[character];

    if(amount > 99){
        return;
    }
    // currently will only take care of no overflow whatsoever, just overwrite the contents
    let temp_item: Item = {
        name: item,
        count: amount,
        image: ""       // need to implement a search for the image
    }

    // push the temporary onto the array and send it back into the JSON file
    char.inventory.push(temp_item);
 
    console.log("Adding to " + characters[character].name + "'s inventory");
    fetch("http://localhost:5001/api/characters", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(char)
    })
    .then(res => res.json())
    .catch(err => console.error("Fetch failed: ", err));
}




// fetch items json immediately
fetch("json/items.json")
  .then(res => res.json())
  .then((data) => {
    items = data;
    console.log("Items loaded");
  })
  .catch((err) => {
    console.error("Failed to load items:", err);
  });
