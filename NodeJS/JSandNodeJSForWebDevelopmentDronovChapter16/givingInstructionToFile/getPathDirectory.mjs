import path from 'path';
import { fileURLToPath } from 'url';

//get the current file path 
const __filename = fileURLToPath(import.meta.url);
//get the current directory path
const __dirname = path.dirname(__filename);

//print the path to the file.txt in the current directory
console.log(path.resolve(__dirname, 'file.txt'));
//the same as above but with a different path format
console.log(path.resolve(__dirname, './file.txt'));
console.log(path.resolve(__dirname, '.\\file.txt'));

//print the path to the file.txt in the parent directory
console.log(path.resolve(__dirname, '..\\file.txt'));
console.log(path.resolve(__dirname, '../file.txt'));
console.log(path.resolve(__dirname, '..\\..\\file.txt'));
console.log(path.resolve(__dirname, '../../file.txt'));

//print the path to the file.txt in a specific directory
console.log(path.resolve(__dirname, '\\JavaScript\\NodeJS\\file.txt'));
console.log(path.resolve(__dirname, '/JavaScript/NodeJS/file.txt'));

//print the path to the file.txt in a specific drive
console.log(path.resolve(__dirname, 'D:\\file.txt'));
console.log(path.resolve(__dirname, 'D:/file.txt'))