import assert from "assert/strict";
import { createReadStream, createWriteStream } from "fs";
import { Transform, pipeline } from 'stream';

//test to verify that pipeline and pipe return the destination stream
const streamA = createReadStream('../package.json');
//transform stream to convert data to uppercase
const streamB = new Transform({
    //implement the _transform method to convert chunk to uppercase
    transform(chunk, _enc, done){
        //push the uppercase and stringified chunk to the readable side
        this.push(chunk.toString().toUpperCase());
        //signal that the transformation is complete
        done();
    }
})
//destination stream to write the transformed data
const streamC = createWriteStream('package-uppercase.json');

//use pipeline to connect the streams and handle errors
const pipelineReturn = pipeline(streamA, streamB, streamC, (err) => {
    if(err){
        return console.error('Pipeline failed:', err);
    }
})
//assert that the return value of pipeline is this destination stream
assert.equal(streamC, pipelineReturn);

//reset streams for pipe test
const pipeReturn = streamA.pipe(streamB).pipe(streamC);
//assert that the return value of pipe is this destination stream
assert.equal(streamC, pipeReturn)