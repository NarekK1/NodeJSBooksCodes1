import axios from 'axios';
import { createReadStream } from 'fs';
import { createBrotliCompress } from 'zlib';
import { PassThrough } from 'stream';
import { basename } from 'path';

//get file path from command line arguments
const filepath = process.argv[2];
//get filename from file path
const filename = basename(filepath);
//create a PassTrough stream to handle the compressed data
const contentStream = new PassThrough();

//function to upload file
function upload(filename, contentStream){
    //send POST request to server with file data and filename header
    return axios.post(
        //server URL
        'http://127.0.0.1:3000/',
        contentStream, 
        {
            //header with filename
            headers: {
                //content type for binary data
                'Content-Type': 'application/octet-stream',
                //custom header for filename
               'X-Filename': filename
            }
        }
    )
}
//call upload function with compressed filename and content stream 
upload(`${filename}.br`, contentStream)
//handle response
.then(res => {
    //log server response data
    console.log(res.data);
})
//handle errors
.catch(err => {
    //log error message
    console.error('Error uploading file:', err.message);
    //exit with failure code
    process.exit(1);
});
//pipe file read stream through Brotli compression into content stream
createReadStream(filepath)
.pipe(createBrotliCompress())
.pipe(contentStream);