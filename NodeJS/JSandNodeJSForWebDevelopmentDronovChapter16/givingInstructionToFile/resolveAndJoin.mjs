import path from 'path';
import { fileURLToPath } from 'url';

//filename gives the full path to the current file, including the file name
const __filename = fileURLToPath(import.meta.url);
//dirname gives the directory of the current file, excluding the file name
const __dirname = path.dirname(__filename);

//log the current working directory
console.log('cwd: ' + path.resolve());
//log the directory of the current file
console.log(path.resolve(__dirname, 'resolveAndJoin.mjs'));
//log the joined path of the current directory and the file name
console.log(path.join(__dirname, 'resolveAndJoin.mjs'));