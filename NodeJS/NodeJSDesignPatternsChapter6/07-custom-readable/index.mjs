import { RandomStream } from "./random-stream.mjs";

//create an instace of RandomStream
const randomStream = new RandomStream();
//consume the stream and log the data and total bytes produced
randomStream
//data event handler to log each chunk received and its size then makes it string
.on('data', chunk => console.log(`Chunk received (${chunk.length} bytes): ${chunk.toString()}`))
//end event handler to log total bytes produced
.on('end', () => console.log(`Produced ${randomStream.emittedBytes} bytes of random data`));
