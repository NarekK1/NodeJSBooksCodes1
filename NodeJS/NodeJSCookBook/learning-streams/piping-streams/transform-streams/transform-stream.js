//imports fs from node js core library
const fs = require("fs");

// imports Transform from stream module
const { Transform } = require("stream");

//reads the file
const rs = fs.createReadStream("./file.txt");

//creates a transform stream that converts data to uppercase
const newFile = fs.createWriteStream("./newFile.txt");

const uppercase = new Transform({
    transform(chunk, encoding, callback) {
        // Convert chunk to uppercase     
        callback(null, chunk.toString().toUpperCase());
    }
});


//pipes the readable stream through the transform stream to the writable streamnod
rs.pipe(uppercase).pipe(newFile);