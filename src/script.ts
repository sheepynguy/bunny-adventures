//import {chapters, Chapter, Scene} from "./chapters";

/* Variable Declarations for the main screen */
const textbox = document.getElementById("main-text") as HTMLDivElement; // holds the text of the game
const speaker = document.getElementById("speaker-name") as HTMLDivElement;  // holds the name of the current speaker
const background = document.getElementById("scene-image") as HTMLImageElement;  // holds the background
const player = document.getElementById("player-image") as HTMLImageElement; // holds the player's image
const npc_1 = document.getElementById("character-image-1") as HTMLImageElement; // holds the player's image
const npc_2 = document.getElementById("character-image-2") as HTMLImageElement; // holds the player's image
const choice_1 = document.getElementById("choice-1") as HTMLButtonElement;
const choice_2 = document.getElementById("choice-2") as HTMLButtonElement;
const choice_3 = document.getElementById("choice-3") as HTMLButtonElement;



/* Helper functions */
async function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}




/* Variable declaractions for traversing the chapter */
let chapter_index = 0;
let current_chapter_key = `chapter${chapter_index}`;
let scene_index = 0;

// this function moves the game from the title screen to the main game screen
function start_game() {
    let mainscreen = document.getElementById("game-intro-screen") as HTMLDivElement;
    mainscreen.style.display = "none";
    mainscreen = document.getElementById("game-screen") as HTMLDivElement;
    mainscreen.style.display = "block";
    textbox.addEventListener("click", next_scene);
    choice_1.addEventListener("click", next_scene); // i think this needs to be changed to choice; that's why I was getting a weird bug earlier
    choice_2.addEventListener("click", next_scene);
    choice_3.addEventListener("click", next_scene);
    show_chapter(); // start the game
}

/* This function opens up the chapter with the starting scene */
function show_chapter() {
    const chapter = chapters[current_chapter_key];
    const scene = chapter.scenes[scene_index];

    if(scene.type === "special"){
        return;
    }
    textbox.textContent = scene.text;
    console.log("hello!");
}

/* Variable declarations for moving between scenes and choices */
let choiceActive = false;
let creationActive = false;
let nextScene = -1; // a non-negative scene indicates that we need to jump scenes
let choiceScenesLeft = -1;   // counter
/*This functions moves into the next scene of the chapter.
  If there are no more scenes to walk through, black out the screen
  with an "End of Chapter #" text.
*/
function next_scene() {
    if(choiceActive || creationActive) return;    // do not advance the textbox if the choice boxes are on the screen

    if(choiceScenesLeft == 0){  // reset all the variables after a scene jump
        scene_index = nextScene - 1;
        nextScene = -1;
        choiceScenesLeft = -1;
    }

    const chapter = chapters[current_chapter_key];
    scene_index++;

    if(scene_index < chapter.scenes.length){
        if(nextScene != -1){    // we need to jump to consider whether we need to jump scenes after a choice was made
            choiceScenesLeft--;
        }

        if(current_chapter_key === "chapter0" && scene_index === 29){
            const name_button = document.getElementById("name-submit") as HTMLButtonElement;
            name_button.addEventListener("click", () => {
                const name = document.getElementById("player-name") as HTMLInputElement;
                set_name(name.value);
            });
            launch_character_creation();
        }

        const scene = chapter.scenes[scene_index];
        if(scene.type === "special"){
            show_special_scene();
        }
        else{
            textbox.textContent = scene.text;
            if(scene.speaker){  // change the speaker name if the speaker is not the narrator
                speaker.textContent = scene.speaker;
            }
            else{
                speaker.textContent = "";
            }

            if(scene.choices){  // show the choice buttons and the text that needs to go inside them
                const buttons = document.getElementById("button-container") as HTMLDivElement;
                buttons.style.display = "block";
                choice_1.textContent = scene.choices[0].text;
                choice_2.textContent = scene.choices[1].text;
                choice_3.textContent = scene.choices[2].text;   // this will change depending on whether we always implement 3 choices
                choiceActive = true;
            }
        }
    }
    else{   // end the scene and increment to the next chapter
        textbox.textContent = `End of Chapter ${chapter_index}`;
        speaker.textContent = "";   // empty out the speaker box
        chapter_index++;
        current_chapter_key = `chapter${chapter_index}`;
        scene_index = 0;
    }
}


/*This function will handle any special scenes in the story*/
async function show_special_scene(){
    let chapter = chapters[current_chapter_key];
    let scene = chapter.scenes[scene_index];    // pull the special scene

    if(scene.type === "normal"){
        return; // return from this function if it's a normal scene
    }

    if(scene.speaker){  // change the speaker name if the speaker is not the narrator
        speaker.textContent = scene.speaker;
    }
    else{
        speaker.textContent = "";
    }

    let ss_index = 0;
    textbox.textContent = scene.text[ss_index];
    // show the image here
    await delay(2000);

    for(ss_index++; ss_index < scene.text.length; ss_index++){
        textbox.textContent += scene.text[ss_index];
        await delay(2000);  // adjust the delay after adding in the images.
    }
    
}

/*This function will move into the next scene based on the choice button pressed.
  The textbox will unlock after this function is finished */
function choice(branch: number) {
    const chapter = chapters[current_chapter_key];
    let scene = chapter.scenes[scene_index];    // get the current scene we are pulling the choices from

    if(scene.type === "special"){
        return;
    }
    // we are working under the assumption that scene does have a choice, which is why we are in this function
    if(!scene.choices){
        return;
    }
    scene_index = scene.choices[branch].index - 1;  // pull up the text index for the choice made 
    console.log(`I am picking choice ${branch} and I am moving to index ${scene_index}`);
    nextScene = scene.choices[branch].next;
    choiceScenesLeft = scene.choices[branch].length;
    scene = chapter.scenes[scene_index];
    if(scene.type === "special"){
        return; // I don't understand why we have to do this check again
    }   
    textbox.textContent = scene.text;
    if(scene.speaker){  // change the speaker name if the speaker is not the narrator
        speaker.textContent = scene.speaker;
    }
    

    choiceActive = false;
    const buttons = document.getElementById("button-container") as HTMLDivElement;
    buttons.style.display = "none";
}


/*This function will launch the character creation box and set up the display*/
function launch_character_creation() {
    const cc_screen = document.getElementById("character-creation-screen") as HTMLDivElement;
    cc_screen.style.display = "block";
    creationActive = true;
}

function set_name(name: string){
    
}