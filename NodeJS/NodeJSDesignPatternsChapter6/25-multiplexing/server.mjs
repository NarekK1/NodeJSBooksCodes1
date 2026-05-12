import { createWriteStream } from 'fs';
import { createServer } from 'net';

//function to demultiplex a single readable stream into multiple writable streams
function demultiplexChannel(source, destinations){
    //keep track of current channel and length being processed
    let currentChannel = null;
    let currentLength = null;
    //read data from the source stream
    source
    .on('readable', () => {
        //read channel id, length, and data
        let chunk;
        //if we don't have a current channel, read it
        if(currentChannel === null){
            chunk = source.read(1);
            //if chunk is null, return to wait for more data
            currentChannel = chunk && chunk.readUInt8(0);
        }
        //if we don't have a current length, read it
        if(currentLength === null){
            chunk = source.read(4);
            //if chunk is null, return to wait for more data
            currentLength = chunk && chunk.readUInt32BE(0);
            //if length is zero, skip to next pocket
            if(currentLength === 0){
                return null;
            }
        }
        //read the data chunk of the specified length
        chunk = source.read(currentLength);
        //if chunk is null, return to wait for more data
        if(chunk === null){
            return null; 
        }
        //write the chunk to the appropriate destination stream
        console.log(`Received packet from: ${currentChannel}`);
        //write the data chunk to the correct destination based on channel id
        destinations[currentChannel].write(chunk);
        //reset current channel and length for next pocket
        currentChannel = null;
        currentLength = null;
    })
    //when the source stream ends, end all destination streams
    .on('end', () => {
        //end all destination streams
        destinations.forEach(destination => destination.end());
        //log that the source channel has closed
        console.log('Source channel closed');
    });
}

//create a TCP server to accept multiplexed connections
const server = createServer(socket => {
    //create write streams for stdout and stderr logs
    const stdoutStream = createWriteStream('stdout.log');
    const stderrStream = createWriteStream('stderr.log');
    //demultiplex the incoming socket data to the stdout and stderr streams
    demultiplexChannel(socket, [stdoutStream, stderrStream]);
})
//start the server on port 3000 and log when started
server.listen(3000, () => console.log('Server started'));