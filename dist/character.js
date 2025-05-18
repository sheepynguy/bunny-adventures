"use strict";
/*This function will launch the character creation box and set up the display*/
function launch_character_creation() {
    const cc_screen = document.getElementById("character-creation-screen");
    cc_screen.style.display = "block";
    creationActive = true;
}
let temp_name = "";
let temp = {
    class: "",
    health: 0,
    attack: 0,
    inventory: []
};
/*This function will get the name typed from the input textbox and store it into a temporary space*/
function set_name(name) {
    if (name.length === 0) {
        return;
    }
    temp_name = name;
    // close the name box and progress the text box
    const name_box = document.getElementById("name-step");
    name_box.style.display = "none";
}
/*This function will receive the class selected and populate the health
  and attack stats for the character.
  Available classes are knight, warrior, priest, archer, mage
*/
function set_class(specialty) {
    let health_low = 0, health_high = 0, attack_low = 0, attack_high = 0;
    let health, attack;
    switch (specialty) {
        case ("knight"):
            health_low = 60;
            health_high = 80;
            attack_low = 5;
            attack_high = 10;
            break;
        case ("warrior"):
            health_low = 60;
            health_high = 70;
            attack_low = 8;
            attack_high = 10;
            break;
        case ("priest"):
            health_low = 80;
            health_high = 100;
            attack_low = 3;
            attack_high = 5;
            break;
        case ("archer"):
            health_low = 50;
            health_high = 60;
            attack_low = 3;
            attack_high = 5;
            break;
        case ("mage"):
            health_low = 50;
            health_high = 60;
            attack_low = 5;
            attack_high = 10;
            break;
    }
    let i;
    for (i = 0; i < 5; i++) {
        temp.health = health_low + (Math.random() % health_high);
    }
    for (i = 0; i < 5; i++) {
        temp.attack = attack_low + (Math.random() % attack_high);
    }
    temp.class = specialty;
    const class_box = document.getElementById("class-step");
    class_box.style.display = "none";
}
