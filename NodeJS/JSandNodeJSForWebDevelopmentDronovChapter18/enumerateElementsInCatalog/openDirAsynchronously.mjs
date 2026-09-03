import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//get the current file name and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//join the current directory with the folder name to get the full path
const p  = path.join(__dirname, 'folder1');

//open the directory asynchronously and read its contents
fs.opendir(p, function(err, dir){
    //if there is an error, throw it
    if(err){
        //log the error to the console
        throw err;
    }
    //read the directory synchronously and log the name of each entry to the console
    let d;
    //use a while loop to read each entry in the directory until there are no more entries
    while((d = dir.readSync)){
        //log the name of the entry to the console
        console.log(d.name);
    }
});