import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
 
//getting the file name and directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//getting information about a file
let stats = fs.statSync('./gettingInformationAboutFile/file1.txt');
//log the stats to the console to check if it is a directory
console.log(stats.isDirectory()); 

//getting information about a directory
stats = fs.statSync(__dirname);
//log the stats to the console to check if it is a directory
console.log(stats.isDirectory());