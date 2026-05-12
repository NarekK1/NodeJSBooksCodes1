import { fork } from 'child_process';
import { connect } from 'net';

//function to multiplex multiple readable streams into a single writable stream
function multiplexChannels(sources, destination){
    //keep track of open channels to know when to end the destination stream
    let openChannels = sources.length;
    //for each source stream, read data and write to the destination with channel info
    for (let i = 0;  i < sources.length; i++){
        //use a closure to capture the current index
        sources[i]
        //read data from the source stream
        .on('readable', function () {
            //read chunks until none are left
            let chunk;
            //while there is data to read and not null
            while((chunk = this.read()) !== null){
                //create a buffer to hold channel id, length, and data
                const outBuff = Buffer.alloc(1 + 4 + chunk.length);
                //write uint8 channel id, uint32 length, and chunk data
                outBuff.writeUInt8(i, 0); //channel id
                outBuff.writeUInt32BE(chunk.length, 1); //chunk length
                chunk.copy(outBuff, 5); //chunk data

                //log sending packet info and write to destination
                console.log(`Sending packet to channel ${i}`);
                //write the multiplexed buffer to the destination stream
                destination.write(outBuff);
            }
        })
        //when the source stream ends, decrement open channels and possibly end destination
        .on('end', () => {
            //when a source stream ends, check if all have ended
            if(--openChannels === 0){
                destination.end();
            }
        })
    }
}

//connect to the server and fork the child process
const socket = connect(3000, () => {
    //fork the child process with command line arguments
    const child = fork(
        //path to the child process script
        process.argv[2],
        //pass remaining command line arguments to the child
        process.argv.slice(3),
        //silent option to create pipes for stdio
        { silent: true }
    )
    //multiplex the child's stdout and stderr to the socket
    multiplexChannels([child.stdout, child.stderr], socket);
})