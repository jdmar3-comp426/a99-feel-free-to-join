"use strict"
//require fs
let fs = require("fs");

// Create new words json object
let words = {"words":[]}

//check if json file exists
let exists = fs.existsSync("./words.json")

//create file and fill it if it doesn't
if (!exists) { 
    let text = fs.readFileSync('./words.txt', "utf-8");
    words.words = text.split('\r\n');
    const data = JSON.stringify(words)
    fs.writeFile('./words.json', data, (err)=> {
        if (err) {throw err;}
    });
}