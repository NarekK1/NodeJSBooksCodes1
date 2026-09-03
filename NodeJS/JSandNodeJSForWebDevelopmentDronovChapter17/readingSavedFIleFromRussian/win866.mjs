import fs from 'fs';
import iconv from 'iconv-lite';
import path from 'path';
import { fileURLToPath } from 'url';

//getting file name and directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//path to the file with cp866 encoding
const p = path.join(__dirname, 'cp866.txt')

//creating read stream
const rstream = fs.createReadStream(p);
//creating decode stream with cp866 encoding
const dstream = iconv.decodeStream('cp866');

//handling errors and data events
rstream.on('error', err => console.log("Error:", err));
//logging decoded data to the console
dstream.on('data', chunk => console.log(chunk));

//piping read stream to decode stream
rstream.pipe(dstream);