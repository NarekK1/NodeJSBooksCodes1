//imports fs from node js core library
const fs = require("fs");

//creates a file and writes into it 
const file = fs.createWriteStream("./file.txt");

//writes 1 million strokes in the wile with given text
for(let i = 0; i <= 1000000; i++){
    file.write(
        "Node.js is a JavaScript runtime built on Google Chomes's V8 JavaScript enguine.\n"
    )
}