import path from 'path';

//get the directory name of a path
let p = 'C:\\Users\\Narek\\Desktop\\JavaScript\\NodeJS\\JSandNodeJSForWebDevelopmentDronovChapter16\\changingPaths\\test.txt';

//logs the directory name of the path
console.log(path.basename(p));
console.log(path.basename(p, '.txt'));
console.log(path.basename(p, 'txt'));
console.log(path.basename(p, '.doc'));