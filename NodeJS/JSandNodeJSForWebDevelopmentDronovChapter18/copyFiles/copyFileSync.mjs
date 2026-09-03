import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcPath = path.join(__dirname, 'file1.txt');
const destPath = path.join(__dirname, 'folder1', 'file_1.txt');

try {
    fs.copyFileSync(srcPath, destPath, fs.constants.COPYFILE_EXCL);
    console.log('File copied successfully.');
}
catch(err){
    console.error(err.message);
}

console.log('End of program');