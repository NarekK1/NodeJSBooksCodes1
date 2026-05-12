//imports fs from node js core library
const fs = require("fs");

//reads the file
const rs = fs.createReadStream("./file.txt");

//registers a readable event handler on the readable stream
rs.on("readable", function(){
    let data = rs.read();
    while(data !== null){
        console.log("Read chunk:", data);
        data  = rs.read();
    }
});

rs.on("end", function(){
    console.log("No more data.");
});