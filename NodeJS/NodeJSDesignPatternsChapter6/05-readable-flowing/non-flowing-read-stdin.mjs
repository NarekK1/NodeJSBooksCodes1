//example of reading from stdin in non-flowing mode
process.stdin.on('data', chunk =>{
    //log when new data is avaiable
    console.log('New data available');
    //log the chunk size and content and makes it a string
    console.log(`Chunk read (${chunk.length} bytes): "${chunk.toString()}"`);
})
//log when the end of the stream is reached
.on('end', () => console.log('End of stream'));