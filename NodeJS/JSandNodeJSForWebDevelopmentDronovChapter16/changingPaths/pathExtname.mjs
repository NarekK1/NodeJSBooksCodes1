import path from 'path';

//get the directory name of a path
let p = 'C:\\Users\\Narek\\Desktop\\JavaScript\\NodeJS\\JSandNodeJSForWebDevelopmentDronovChapter16\\changingPaths\\test.txt';
//logs the extansion name of the path
console.log(path.extname(p));

//get the directory name of a path
p = 'C:\\Users\\Narek\\Desktop\\JavaScript\\NodeJS\\JSandNodeJSForWebDevelopmentDronovChapter16\\changingPaths\\test';
//log the extansion name of the path with no extansion
console.log(path.win32.extname(p));

//get the directory name of a path
p = '/JSandNodeJSForWebDevelopmentDronovChapter16/changingPaths/test.txt';
//log the extansion name of the path with posix
console.log(path.posix.extname(p));