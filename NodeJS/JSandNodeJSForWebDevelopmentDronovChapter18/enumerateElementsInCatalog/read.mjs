import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//get the current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//join the current directory with the folder name to get the full path
const p = path.join(__dirname, 'folder1');

//open the directory and read its contents
fs.opendir(p, function(err, dir){
    //handle any errors that occur while opening the directory
    if(err){
        //log the error and exit the function
        throw err;
    }
    //read the contents of the directory and log the name of each entry
    dir.read(function(e, d){
        //handle any errors that occur while reading the directory
        if(e){
            //log the error and exit the function
            throw e;
        }
        //log the name of the directory entry
        console.log(d.name);
    });
});