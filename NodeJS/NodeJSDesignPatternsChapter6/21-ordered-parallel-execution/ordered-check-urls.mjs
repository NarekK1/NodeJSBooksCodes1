import { pipeline  } from "stream";
import { createReadStream, createWriteStream } from "fs";
import split from "split";
import request from "request-promise";
import parallelTransform from 'parallel-transform';

//pipeline to read urls from a file, check if they are up or down in parallel, and write results to another file
pipeline(
    //read urls from a file specified as a command line argument
    createReadStream(process.argv[2]),
    //split the input into lines (urls)
    split(),
    //check each url in parallel with a concurrency of 4
    parallelTransform(4, async function(url, done){
        //skip empty lines
        if(!url){
            return done();
        }
        //log the url being checked
        console.log(url);
        //check if the url is up or down
        try{
            //make a HEAD request to the url with a timeout of 5 seconds
            await request.head(url, { timeout: 5 * 1000 });
            //if the request succeeds, the url is up
            this.push(`${url} is up\n`);
        }
        //if the request fails, the url is down
        catch(err){
            this.push(`${url} is down\n`)
        }
        //signal that the processing of this url is complete
        done();
    }),
    //write the results to a file named results.txt
    createWriteStream('results.txt'),
    //handle any errors that occur during the pipeline
    err => {
        //log completion error and exit with failure code 1
        if(err){
            console.error(err);
            process.exit(1);
        }
        //log successful completion
        console.log('All urls have been checked.');
    }
)
