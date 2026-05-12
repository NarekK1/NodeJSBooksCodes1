//imports fs library
const fs = require("fs");

//reads the filename as a command-line
const file = process.argv[2];

//returns file stats
function printMetada(file){
    try{
    const fileStats = fs.statSync(file);
    console.log(fileStats);
    }catch(err){
        console.error("Error reading file path:", file);
    }
}
printMetada(file);