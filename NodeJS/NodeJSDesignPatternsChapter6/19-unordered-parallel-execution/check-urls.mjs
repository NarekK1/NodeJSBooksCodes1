import { createReadStream, createWriteStream } from 'fs';
import { createInterface } from 'readline';
import { pipeline } from 'stream/promises';
import { ParallelStream } from './parallel-stream.mjs';

//reads urls from a file, checks their availability, and writes results to an output file
const inputFile = createReadStream(process.argv[2]);
//create a readline interface to read the file line by line
const fileLines = createInterface({input: inputFile});
//a transform stream that checks url availability in parallel
const checkUrls = new ParallelStream(async (url, enc, push, done) => { 
    //skip empty lines
    if(!url){
        return done();
    }
    //checks url availability using fetch
    try {
        //add timeout to avoid hangling requests
        await fetch(url, { method: 'HEAD', timeout: 5 * 1000});
        //if successful, push "is up" message
        push(`${url} is up\n`);
    }
    //if there is an error, push "is down" message
    catch(err){
        //push the error message
        push(`${url} is down: ${err}\n`);
    }
    //signal completion
    done();
});

//set up the pipeline to read from input file, check urls, and write to output file
const outputFile = createWriteStream('results.txt');
//execute the pipeline
await pipeline(fileLines, checkUrls, outputFile);
//log completion message
console.log('All urls have been checked');