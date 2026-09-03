import { dirname } from 'path';
import { fileURLToPath } from 'url';

//import.meta.url is a special variable in ES modules that contains the URL of the current module
console.log(import.meta.url);

//fileURLToPath is a function that converts a file URL to a file path
const __filename = fileURLToPath(import.meta.url);
//dirname is a function that returns the directory name of a path
const __dirname = dirname(__filename);

// Now we can use __dirname and __filename in our ES module
console.log(__dirname);
console.log(__filename)