import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//file path and directory setup for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//join the current directory with 'test.txt' to create the full path for the input file
const p = path.join(__dirname, 'test.txt');
//create a stream to read the contents of 'test.txt' without specifying an encoding, which means it will return Buffer objects
const stream = fs.createReadStream(p);

//listen for 'readable' events emitted by the stream, which indicates that there is data available to read
stream.on('readable', () =>{
    //variable to hold the chunk of data read from the stream
    let chunk;

    //read data from the stream in a loop until there is no more data to read
    while(null !== (chunk = stream.read())){
        //log each chunk of data to the console.
        console.log(chunk);
    }
});

//handle errors that may occur while reading the stream by listening for 'error' events and logging any errors to the console
stream.on('error', err => console.log('Error:', err));
