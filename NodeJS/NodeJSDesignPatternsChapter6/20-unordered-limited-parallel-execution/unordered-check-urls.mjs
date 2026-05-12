import { pipeline } from 'stream';
import { createReadStream, createWriteStream } from 'fs';
import split from 'split';
import request from 'request-promise';
import { LimitedParallelStream } from './limited-parallel-stream.mjs';

//pipeline to read URLs from a file, check their status in parallel with limited concurrency, and write results to an output file
pipeline(
    //read URLs line by line from input file
    createReadStream(process.argv[2]),
    //split the input into lines
    split(),
    //process URLs with limited parallelism
    new LimitedParallelStream(
        //set concurrency limit to 
        4,
        //user-defined transform function to check if URL is up or down
        async (url, enc, push, done) => {
            //skip empty lines
            if(!url){
                return done();
            }
            //log the URL being checked
            console.log(url);
            //check the URL status
            try{
                //make a HEAD request to the URL with a timeout
                await request.head(url, { timeout: 5 * 1000 });
                //pushes the result indicating the URL is up
                push(`${url} is up\n`);
            }
            //handle errors indicating the URL is down
            catch(err){
                //pushes the result indicating the URL is down
                push(`${url} is down\n`);
            }
            //signal completion of this transformation
            done();
        }
    ),
    //write results to output file
    createWriteStream('results.txt'),
    //final callback to handle completion or errors
    err => {
        //handle any errors that occurred during the pipeline
        if(err){
            //log the error
            console.error(err);
            //exit with failure code
            process.exit(1);
        }
        //log successful completion
        console.log('All urls have been checked.');
    }
)