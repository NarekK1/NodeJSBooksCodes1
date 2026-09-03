import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//get the current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//join the current directory with the folder name to get the full path
const p = path.join(__dirname, 'folder1');

//read the directory synchronously and log the array of file names
const arr = fs.readdirSync(p, { encoding: 'utf8', withFileTypes: false });
//log the array of file names
console.log(arr);