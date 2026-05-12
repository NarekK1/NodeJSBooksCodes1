import { createGzip, createGunzip } from "zlib";
import { Transform, pipeline } from "stream";
import { promisify } from "util";

//promisify the pipeline function
const pipelinePromise = promisify(pipeline);

//a transform stream that uppercases all input
const uppercasify = new Transform({
    //implement the _transform method
    transform(chunk, enc, cb){
        //push the uppercased chunk and makes it a string
        this.push(chunk.toString().toUpperCase());
        //call the callback to signal completion
        cb();
    }
})
//main function to run the pipeline
async function main() {
    //use a try-catch block to handle errors
    try{
        //set up the pipeline with stdin, gunzip, uppecasify, czip, and stdout
        await pipelinePromise(
            process.stdin,
            createGunzip(),
            uppercasify,
            createGzip(),
            process.stdout
        );
    }
    //catch and log any errros
        catch(err){
            console.error(err);
            process.exit(1);
        }
}
main();