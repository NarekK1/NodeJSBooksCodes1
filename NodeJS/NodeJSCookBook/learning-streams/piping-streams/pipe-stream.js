//imports fs from node js core library
const fs = require("fs");

//creates the readable stream that reads the file
const rs = fs.createReadStream("file.txt");

rs.pipe(process.stdout);