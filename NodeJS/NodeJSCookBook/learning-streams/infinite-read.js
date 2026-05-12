//imports fs from node js core library
const fs = require("fs");

//creates and reads directory
const rs = fs.createReadStream("");

let size = 0;
rs.on("data", function(data){
    size += data.length;
    console.log("File size:", size);
})