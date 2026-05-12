//imports fs from node js core library
const fs = require("fs");

// imports Transform from stream module
const stream = require("stream");

//promisify pipeline function
const util = require("util");

//reads the file
const pipeline = util.promisify(stream.pipeline);

//makes a transform stream that converts data to uppercase
const uppercase = new stream.Transform({
    // Implement the _transform method
    transform(chunk, encoding, callback){
        // Convert chunk to uppercase and string
        callback(null, chunk.toString().toUpperCase());
    },
});

// Use the pipeline function to pipe streams together asynchronously
async function run(){
    await pipeline(
        //reads the file
        fs.createReadStream("./file.txt"), uppercase,
        //writes to new file
        fs.createWriteStream("./newFile.txt")
    );
    console.log("Pipeline succeeded.");
}
run().catch(function(err){
    console.error("Pipeline failed.", err);
})