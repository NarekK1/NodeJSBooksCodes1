import fs from 'fs';
import zlib from 'zlib';
import { pipeline } from 'stream/promises';

//compress a file and write it to disk, while showing progress in the console
const file = process.argv[2];

//create a pipeline that reads the file, compresses it, and writes it to disk, while showing progress in the console
await pipeline(
    //create a readable stream from the file
    fs.createReadStream(file),
    //compress the file using gzip
    zlib.createGzip(),
    //create a transform stream that shows progress in the console
    async function* (source) {
        //for each chunk of data, write a dot to the console and yield the chunk
        for await(const chunk of source){
            //write a dot to the console
            process.stdout.write('.');
            //yield the chunk to the next stream in the pipeline
            yield chunk;
        }
    },
    //create a writable stream to write the compressed file to disk
    fs.createWriteStream(file + '.gz')
)