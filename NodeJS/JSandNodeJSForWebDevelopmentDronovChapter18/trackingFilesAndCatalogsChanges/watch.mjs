import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//get the current file name and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//join the directory name with the file name to get the full path of the file to watch
const p = path.join(__dirname, 'file1.txt');

//watch the file for changes and log the event and file name when a change occurs
const obj = fs.watch(p, { encoding: 'utf8', recursive: false, persistent: true }
    //the callback function is called when a change occurs in the file being watched
    ,(e, fileName) => {
        //log the event and file name to the console
        console.log(`event: ${e}`);
        //log the file name to the console
        console.log(`fileName: ${fileName}`);
});

//log the object returned by fs.watch to the console
console.log(obj);