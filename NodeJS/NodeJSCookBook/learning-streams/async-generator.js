const { Readable } = require("stream");

async function* generate(){
    yield "Node.js";
    yield "is";
    yield "a";
    yield "JavaScript";
    yield "Runtime";
}

//creates a readable stream
const readable = Readable.from(generate());

//prints the chunks of output of content of readable stream
readable.on("data", function(chunk){
    console.log(chunk);
})
