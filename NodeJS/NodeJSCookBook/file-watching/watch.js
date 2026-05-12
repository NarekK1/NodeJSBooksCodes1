//imports fs library
const fs = require("fs");

//imports moment from moment lib
const moment = require("moment");

//the file name is in the text
const file = "./file.txt";

//finds the file
// fs.watchFile(file, function(current, previous){
    //prints when the file is updated
    const time = moment().format("MMMM Do YYYY, h:mm:ss");
    return console.log(`${file} updated ${time}`);
// })

