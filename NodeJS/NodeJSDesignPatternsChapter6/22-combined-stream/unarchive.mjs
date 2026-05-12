import { createReadStream, createWriteStream } from "fs";
import { pieline } from 'stream';
import { createDecryptAndDecompress } from './combined-streams.mjs';

//get command line arguments: password, iv (hex), source file, destination file
const [, ,password, ivHex, source, destination ] = process.argv;
//convert iv from hex string to Buffer
const iv = Buffer.from(ivHex, 'hex');

//use pipeline to read from source,decrypt and decompress, then write to destination
pipeline(
    //create read stream from source file
    createReadStream(source),
    //create transform stream to decrypt and decompress data
    createDecryptAndDecompress(password, iv),
    //create write stream to destination file
    createWriteStream(destination),
    //callback to handle completion or errors
    err => {
        //handle errors
        if(err){
            //log error 
            console.error(err);
            //exit with failure code 1
            process.exit(1);
        }
        //log success message
        console.log(`${destination} created`);
    }
)