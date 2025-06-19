/* 
The purpose of this file is to outline all the functions used for the minigame played throughout this game 
The text for the minigames are sampled out from the minigame.json file, and each battle is considered an entry
*/
type Battle = {
    text: string[];
    opponent: Character;    // a character specified here will not be listed onto the character json file since they are permanent characters, aka not subject to change via new player
};


// This function helps with playing out the tutorial of the rock paper scissors game played.
// The tutorial is completely hands off, meaning that the player does no clicking during the execution of this function
function minigame_tutorial(){
    
}