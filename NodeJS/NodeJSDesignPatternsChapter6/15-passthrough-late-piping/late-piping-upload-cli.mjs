import { createReadStream } from 'fs';
import { createBrotliCompress } from 'zlib';
import { PassThrough } from 'stream';
import { basename } from 'path';
import { upload } from './late-piping-upload.mjs';

//argv[2] should be the file to upload
const filepath = process.argv[2];
//filename to read
const filename = basename(filepath);
//create a passthrough stream to pipe compressed data to upload
const contentStream = new PassThrough();

//start the upload first
upload(`${filename}.br`, contentStream)
//handle the response 
.then((response) => {
    console.log(`Server response: ${response.data}`);
})
//handle errors
.catch((err) => {
    //logs the error and exits
    console.error(err);
    process.exit(1);
})

//pipe the file read stream into bratli compress and then into the content stream
createReadStream(filepath)
.pipe(createBrotliCompress())
.pipe(contentStream);