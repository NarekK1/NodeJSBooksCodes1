import { createReadStream, createWriteStream } from "fs";
import { createHash } from 'crypto';
import { create } from "domain";

//read filename from command line arguments
const filename = process.argv[2];
//create two hash streams: one for sha1 and one for md5
const sha1Stream = createHash('sha1').setEncoding('hex');
const md5Stream = createHash('md5').setEncoding('hex');

//create a read stream from the input file
const inputStream = createReadStream(filename);

//pipe the input stream to both hash streams and write the output to separate files
inputStream
.pipe(sha1Stream)
.pipe(createWriteStream(`${filename}.sha1`));

//reset the input stream for the second hash calculation
inputStream
.pipe(md5Stream)
.pipe(createWriteStream(`${filename}.md5`));