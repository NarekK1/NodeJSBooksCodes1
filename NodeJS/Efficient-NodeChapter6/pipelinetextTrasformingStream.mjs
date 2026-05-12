import { Transform } from 'stream';
import { pipeline } from 'stream/promises';

//Create a Transform stream that converts input text to uppercase
const upperCaseTr = new Transform({
    //implement the _transform method to convert incoming data to uppercase
    transform(chunk, encoding, callback){
        //push the transformed chunk (converted to uppercase) onto the stream
        this.push(chunk.toString().toUpperCase());
        //call the callback to indicate that we're ready for the next chunk
        callback();
    }
});

//use the pipeline function to connect the standard input, the uppercase transform stream, and the standard output
await pipeline(
    process.stdin,
    upperCaseTr,
    process.stdout
);