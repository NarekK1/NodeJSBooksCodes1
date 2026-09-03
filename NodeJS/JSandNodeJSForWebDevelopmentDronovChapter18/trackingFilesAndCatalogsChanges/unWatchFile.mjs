import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//get the current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//join the directory path with the file name to get the full path of the file to watch
const p = path.join(__dirname, 'file1.txt');

//watch the file for changes
fs.watchFile(p, (curStat, prevStat) => {
    //check if the file has been modified
    fs.unwatchFile(p);
    //log the message when the handler is deleted
    console.log('Handler is deleted');
});