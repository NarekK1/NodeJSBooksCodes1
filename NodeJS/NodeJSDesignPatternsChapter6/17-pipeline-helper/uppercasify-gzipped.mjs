import { createGzip, createGunzip } from 'zlib';
import { Transform, pipeline } from 'stream';

//a transform  stream that uppercases all input
const uppercasify = new Transform({
    //implement the _ transform method which is called for each chunk
    transform(chunk, enc, cb){
        //push the uppercased chunk and makes it a string
        this.push(chunk.toString().toUpperCase());
        //call the callback to signal completion
        cb();
    }
})

//set up the pipeline with stdin, gunzip, uppercasify, gzip, and stdout
pipeline(
    process.stdin,
    createGunzip(),
    uppercasify,
    createGzip(),
    process.stdout,
    //callback to handle errors
    err => {
        //check for errors
        if(err){
            //log the error and exit with failure code 1
            console.error(err);
            process.exit(1);
        }
    }
)