import { createReadStream } from 'fs';
import { pipeline } from 'stream';
import { basename } from 'path';
import { createUploadStream } from './piping-alternative-upload.mjs';

//argv[2] should be the file to upload
const file = process.argv[2];
//filename to read
const filename = basename(file);

//filepath to read
pipeline(
    createReadStream(filepath),
    createUploadStream(filename),
    (err) => {
        if(err){
            console.error(err);
            process.exit(1);
        }
        console.log('File uploaded');
    }
)