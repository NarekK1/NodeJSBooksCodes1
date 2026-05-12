import { Transform } from 'stream';

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

//pipe the Transform stream to process stdin and process.stdout so we can read from and write to the console
process.stdin.pipe(upperCaseTr).pipe(process.stdout);