import path from 'path';

//get the directory name of a path
let p = 'C:\\Users\\Narek\\Desktop\\JavaScript\\NodeJS\\JSandNodeJSForWebDevelopmentDronovChapter16\\changingPaths\\test.txt';

//logs the directory name of the path
console.log(path.dirname(p));

//get the directory name of a path 
p = 'C:\\Users\\Narek\\Desktop\\JavaScript\\NodeJS\\JSandNodeJSForWebDevelopmentDronovChapter16\\changingPaths\\test\\';
console.log(path.dirname(p));

//get the directory name of a path
p = '/JSandNodeJSForWebDevelopmentDronovChapter16/changingPaths/tesst/';
//logs the directory name of the path using the posix format
console.log(path.posix.dirname(p));