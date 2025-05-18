type Choice = {
    text: string;   // the actual text for the choice button
    index: number;  // where the text is located in the scenes array
    length: number; // how long the text is
    next: number; // where the next official text is in the scenes array
};

type Special_Scene = {  // eventually this needs to change when I need to switch between speakers fast without a mouse click
    type: "special";
    text: string[];
    speaker?: string;
    image?: string[];
}

type Scene = {
    type: "normal";
    text: string;
    speaker?: string;
    image?: string;
    choices?: Choice[];  // scene index to jump to based on the button pressed
};

type System_Scene = {
    type: string;
    text: string;
}
//{"text": "", "speaker": "", "image": "", "choices": []},

type Chapter = {
    title: string;
    scenes: (Scene | Special_Scene)[];
};

let chapters: Record<string, Chapter> = {};


fetch("json/chapters.json")
  .then(res => res.json())
  .then((data) => {
    chapters = data;
    console.log("Chapters loaded:", chapters);
  })
  .catch((err) => {
    console.error("Failed to load chapters:", err);
  });
