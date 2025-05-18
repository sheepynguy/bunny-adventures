"use strict";
let chapters = {};
fetch("json/chapters.json")
    .then(res => res.json())
    .then((data) => {
    chapters = data;
    console.log("Chapters loaded:", chapters);
})
    .catch((err) => {
    console.error("Failed to load chapters:", err);
});
