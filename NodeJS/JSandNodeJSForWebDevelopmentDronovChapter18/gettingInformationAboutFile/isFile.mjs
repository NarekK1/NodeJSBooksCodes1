import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url'; 

//getting file name and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//getting the stats of the file
let stats = fs.statSync('./gettingInformationAboutFile/file1.txt');
//checking if the path is a file or not
console.log(stats.isFile());

//checking if the path is a directory or not
stats = fs.statSync(__dirname);
//checking if the path is a file or not
console.log(stats.isFile());