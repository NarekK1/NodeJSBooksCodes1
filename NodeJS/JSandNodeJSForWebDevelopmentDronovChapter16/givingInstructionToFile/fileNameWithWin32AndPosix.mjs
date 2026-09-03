import path from 'path';
import { fileURLToPath } from 'url';

//filename is a special variable in CommonJS modules that contains the file path of the current module
const __filename = fileURLToPath(import.meta.url);
//dirname is a function that returns the directory name of a path
const __dirname = path.dirname(__filename);

//logs the file name using path.basename, path.win32.basename and path.posix.basename
console.log(path.basename(__filename));
console.log(path.win32.basename(__filename));
console.log(path.posix.basename(__filename));

//gets the file name from a Windows path 
const p = 'C:\\Users\\Narek\\Desktop\\JavaScript\\NodeJS\\JSandNodeJSForWebDevelopmentDronovChapter16\\givingInstructionToFile\\fileNameWithWin32AndPosix.mjs';

//posix.basename will treat the backslashes as normal characters and will return the whole path as the file name
console.log(path.posix.basename(p));