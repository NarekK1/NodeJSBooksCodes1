import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';
//get the filename from command line arguments
const filename = process.argv[2];
//stream the file, gzip it and write to a new file
createReadStream(filename)
//pipe the read stream through gzip and then to write stream
.pipe(createGzip())
.pipe(createWriteStream(`${filename}.gz`))
//finish event to log success message
.on('finish', () => console.log('File successfully gzipped'));
