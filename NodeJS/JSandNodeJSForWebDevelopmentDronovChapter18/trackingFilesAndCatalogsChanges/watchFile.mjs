import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//get the current file path and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//join the directory name with the file name to get the full path
const p = path.join(__dirname, 'file1.txt');

//watch the file for changes and log the current and previous stats
const obj = fs.watchFile(p, { persistent: true, interval: 5007, bigint: false }, (curStat, prevStat) => {
    //log the current and previous stats of the file
    console.log(`curStat: ${curStat}`);
    console.log(`prevStat: ${prevStat}`);
});

//log the object returned by fs.watchFile
console.log(obj);