import { Transform } from 'stream';
import { pipeline } from 'stream/promises'

//this example reads comma-separated key-value pairs from stdin
const commaSplitter = new Transform({
    //set readableObjectMode to true so we can push arrays instead of strings
    readableObjectMode: true,
    //set writableObjectMode to false since we're receiving strings from stdin
    transform(chunk, encoding, callback){
        //split the chunk into an array of strings using comma as the delimiter
        this.push(chunk.toString().trim().split(','));
        //call the callback to indicate we're done processing this chunk
        callback();
    }
});

//this example transforms the array of key-value pairs into an object
const arrayToObject = new Transform({
    //set readableObjectMode to true so we can push object instead of strings
    readableObjectMode: true,
    //set writableObjectMode to true since we're receiving arrays from the previous transform
    writableObjectMode: true,
    //the transform function takes the array of key-value pairs and converts it into an object
    transform(chunk, encoding, callback){
        //create an empty object to hold the key-value pairs
        const obj = {};
        //iterate over the array in steps of 2 (key and value) and add them to the object
        for(let i = 0; i < chunk.length; i += 2){
            //use the current element as the key and the next element as the value
            obj[chunk[i]] = chunk[i + 1];
        }
        //push the resulting object to the readable side of the stream
        this.push(obj);
        //call the callback to indicate we're done processing this chunk
        callback();
    }
});

//this example transforms the object into a JSON string and adds a newline for readability
const objectToString = new Transform({
    //set readableObjectMode to false since we're outputting strings
    writableObjectMode: true,
    //the transform function takes the object and converts it into a JSON string
    transform(chunk, encoding, callback){
        this.push(JSON.stringify(chunk) + '\n');
        //call the callback to indicate we're done processing this chunk
        callback();
    },
});

//use pipeline to connect the transforms together and handle backpressure
await pipeline(
    process.stdin,
    commaSplitter,
    arrayToObject,
    objectToString,
    process.stdout
);
