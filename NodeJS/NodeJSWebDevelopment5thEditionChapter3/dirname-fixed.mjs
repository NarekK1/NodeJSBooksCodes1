import { fileURLToPath } from 'url';
import { dirname } from 'path';                       

//logs the directory name and file name of the current module to the console
console.log(`import.meta.url: ${import.meta.url}`);

//converts the import.meta.url to a file path and assigns it to __filename
const __filename = fileURLToPath(import.meta.url);
//converts the __filename to a directory name and assigns it to __dirname
const __dirname = dirname(__filename);

//logs the directory name and file name of the current module to the console
console.log(`dirname: ${__dirname}`);
//logs the file name of the current module to the console
console.log(`filename: ${__filename}`);