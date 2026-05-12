import { createWriteStream, createReadStream } from 'fs';
import { Readable, Transform } from 'stream';

//function to concatenate multiple files into a single destination file
export function concatFiles(dest, files){
    //return a promise that resolves when concatenation is complete
    return new Promise((resolve, reject) => {
        //create a writable stream for the destination file
        const destStream = createWriteStream(dest);
        //create a readable stream from the list of files
        Readable.from(files)
        //transform each filename into its file content and pipe to destination
        .pipe(new Transform({
            //enable object made stream to handle filenames
            objectMode: true,
            //implement the _transform method
            transform(filename, enc, done){
                //create a readable stream for the current file
                const src = createReadStream(filename);
                //pipe the file content to the destination stream without ending it
                src.pipe(destStream, { end: false });
                //handle errors and end of the source stream
                src.on('error', done);
                src.on('end', done);
            }
        }))
        //handle errors 
        .on('error', reject)
        //finish event
        .on('finish', () => {
            //end the destination stream and resolve the promise
            destStream.end();
            resolve();
        })
    })
}