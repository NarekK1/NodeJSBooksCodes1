//reads data from standard input in readable mode
process.stdin.on('readable', () => {
    //variable to hold each chunk
    let chunk;
    //log that new data is available
    console.log('New data available');
    //read and log each chunk until null is returned
    while((chunk = process.stdin.read()) !== null){
        //log the chunk size and content and makes it a string
        console.log(`Chunk read (${chunk.length} bytes): "${chunk.toString()}"`);
    }
})
//log when the end of the stream is reached
.on('end', () => console.log('End of stream'));