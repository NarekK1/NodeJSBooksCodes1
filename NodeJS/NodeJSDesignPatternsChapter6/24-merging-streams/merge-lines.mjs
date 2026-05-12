import { createReadStream, createWriteStream } from 'fs'
import split from 'split';

//read destination filename and source filenames from command line arguments
const dest = process.argv[2];
//all arguments after the destination are source files
const sources = process.argv.slice(3);

//create a write stream for the destination file
const destStream = createWriteStream(dest);

//for each source file, create a read stream, split it into lines, and pipe to the destination stream
let endCount = 0;
//keep track of how many source streams have ended
for (const source of sources){
    //create a read stream for the source file with a small highWaterMark to demonstrate streaming
    const sourceStream = createReadStream(source, { highWaterMark: 16 });
    //when the source stream ends, increment the end count and check if all streams have ended
    sourceStream.on('end', () => {
        //when a source stream ends, check if all have ended
        if(++endCount === sources.length){
            destStream.end();
            //log that the destination file has been created
            console.log(`${dest} created`);
        }
    });
    //pipe the source stream trough the split transform to add new lines
    sourceStream
    .pipe(split(line => line + '\n'))
    //directly pipe to the destination stream without ending it
    .pipe(destStream, { end: false });
}