//asynchronously read from standard input
async function main() {
    //iterate over chunks from stdin
    for await(const chunk of process.stdin) {
        //log that new data is avaliable
        console.log('New data available');
        //log the chunk size and content and makes it a string
        console.log(`Chunk read (${chunk.length} bytes): "${chunk.toString()}"`);
    }
    //log when the end of the stream is reached
    console.log('End of stream');
}
main()