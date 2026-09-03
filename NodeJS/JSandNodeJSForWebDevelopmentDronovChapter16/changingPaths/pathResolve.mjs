import path from 'path';
import { fileURLToPath } from 'url';

//filename is a special variable in CommonJS modules that contains the file path of the current module
const __filename = fileURLToPath(import.meta.url);
//dirname is a function that returns the directory name of a path
const __dirname = path.dirname(__filename);

//resolves a sequence of paths or path segments into an absolute path
console.log(path.resolve('C:\\Users\\Narek\\Desktop\\JavaScript\\NodeJS\\JSandNodeJSForWebDevelopmentDronovChapter16', 'changingPaths', 'file.txt'));
//resolves the path to file.txt in the current directory
console.log(path.resolve(__dirname, 'file.txt'));
//resolves the path to file.txt in the parent directory of the current directory
console.log(path.resolve(__dirname, '../file.txt'));

//array of path segments to resolve
let p = ['/JsandNodeJSForWebDevelopmentDronovChapter16', 'changingPaths', 'file.txt'];

//resolves the path segments in the array into an absolute path
console.log(path.resolve(...p));
//resolves the path segments in the array into an absolute path using the current directory as the base
console.log(path.win32.resolve(...p));
//resolves the path segments in the array into an absolute path using the current directory as the base and treating the segments as POSIX paths
console.log(path.posix.resolve(...p));

//array of path segments with some empty segments and a parent directory segment
p = ['C:\\Users\\Narek\\Desktop\\JavaScript\\NodeJS\\JSandNodeJSForWebDevelopmentDronovChapter16', 'changingPaths', '..', '', 'file.txt'];

//resolves the path segments in the array into an absolute path, normalizing the segments and removing any empty segments
console.log(path.resolve(...p));