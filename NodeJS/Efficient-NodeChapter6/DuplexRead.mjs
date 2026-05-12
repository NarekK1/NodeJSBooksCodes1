import { Duplex } from 'stream';

//Create a Duplex stream that reads characters from A to Z and writes any input to the console
const inoutStream = new Duplex({
    //implement the _write method to handle incoming data
    write(chunk, encoding, callback){
        //log the incoming chunk to the console
        console.log(chunk.toString());
        //call the callback to indicate that we're ready for the next chunk
        callback();
    },
    //implement the _read method to push characters from A to Z
    read(size){
        //push the next chnodaracter onto the stream
        this.push(String.fromCharCode(this.currentCharCode++));
        //if we've pushed all characters from A to Z, push null to signal the end of the stream
        if(this.currentCharCode > 90){
            this.push(null);
        }
    }
});

//initialize the currentCharCode to 65 (ASCII code for 'A')
inoutStream.currentCharCode = 65;

//pipe the Duplex stream to process.stdin and process.stdout so we can read from and write to the console
process.stdin.pipe(inoutStream).pipe(process.stdout);