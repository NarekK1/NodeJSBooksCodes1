import path from 'path';
import { fileURLToPath } from 'url';

//filename is a special variable in CommonJS modules that contains the file path of the current module
const __filename = fileURLToPath(import.meta.url);
//dirname is a function that returns the directory name of a path
const __dirname = path.dirname(__filename);

//joins the segments of a path using path.join
console.log(path.join('JSandNodeJSForWebDevelopmentDronovChapter16', 'changingPaths', 'file.txt'));

//array of segments to join
let p = ['JSandNodeJSForWebDevelopmentDronovChapter16', 'changingPaths', 'file.txt'];

//joins the segments of a path using path.join with an array of segments
console.log(path.join(...p));
//joins the segments of a path using path.join with an empty string
console.log(path.win32.join(...p));
//joins the segments of a path using path.join with an empty string
console.log(path.posix.join(...p));

//array of segments with '..' to go up one directory
p = ['JSandNodeJSForWebDevelopmentDronovChapter16', 'changingPaths', '..', 'file.txt'];

//joins the segments of a path using path.join with '..' to go up one directory
console.log(path.join(...p));
//joins the segments of a path using path.join with '.' to stay in the same directory
console.log(path.join(''));
//joins the segments of a path using path.join with directory name and file name
console.log(path.join(__dirname, 'file.txt'));