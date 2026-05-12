//imports fs from node js core library
const fs = require("fs");

const rs = fs.createReadStream("./file.txt");

//registers a data event handler, which will execute each time a chunk of data has been read:
rs.on("data", function(data){
    console.log("Read chunk:", data.toString());
});
rs.on("end", function(){
    console.log("No more data.");
});