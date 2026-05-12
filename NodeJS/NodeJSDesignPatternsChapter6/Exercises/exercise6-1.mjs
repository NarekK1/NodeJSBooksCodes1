import { createDeflate, createGzip, deflateSync, createBrotliCompress } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';

//get the file path from command line arguments
const data = process.argv[2];

//create read and write streams and a gzip transform stream
const readsFile = createReadStream(data);
const writesFile = createWriteStream(`${data}.gz`);
const gzip = createGzip();
//create a deflate buffer
const deflate = deflateSync(data);
//create a deflate transform stream
const compressDeflate = createDeflate();
//create a brotli transform stream
const brotliCompress = createBrotliCompress();

//pipe the read stream through the gzip transform stream to the write stream
readsFile.pipe(gzip).pipe(writesFile);
//pipe the read stream through the deflate transform stream to the write stream
// readsFile.pipe(compressDeflate).pipe(writesFile);
//pipe the read stream through the brotli transform stream to the write stream
// readsFile.pipe(brotliCompress).pipe(writesFile);