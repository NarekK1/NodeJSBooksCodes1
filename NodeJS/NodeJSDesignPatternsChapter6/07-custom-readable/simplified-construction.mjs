
import { Readable } from 'stream';
import Chance from 'chance';

//a readable stream that generates random data
const chance = new Chance();
//counter for emitted bytes
let emittedBytes = 0;

//create a readable stream instance
const randomStream = new Readable({
    //The method generates a random string of length equal to size using chance
    read(size){
        //generate a random string of the requested size
        const chunk = chance.string({length: size});
        //push the chunk to the stream
        this.push(chunk, 'utf8');
        //update the emitted bytes counter
        emittedBytes += chunk.length;
        //randomly end the stream
        if(chance.bool({likelihood: 5})){
            this.push(null);
        }  
    }
})
randomStream
//data event handler to log each chunk received and its size then makes it string
.on('data', chunk => console.log(`Chunk received (${chunk.length} bytes): ${chunk.toString()}`))
//end event handler to log total bytes produced
.on('end', () => console.log(`Produced ${randomStream.emittedBytes} bytes of random data`));