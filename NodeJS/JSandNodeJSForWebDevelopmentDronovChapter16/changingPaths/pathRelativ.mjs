import path from 'path'

//get relative path from p1 to p2
const p1 = 'C:\\Users\\Narek\\Desktop\\JavaScript\\NodeJS\\JSandNodeJSForWebDevelopmentDronovChapter16\\changingPaths\\test';
const p2 = 'C:\\Users\\Narek\\Desktop\\JavaScript\\NodeJS\\JSandNodeJSForWebDevelopmentDronovChapter16\\changingPaths\\p2';

//logs the relative path from p1 to p2
console.log(path.relative(p1, p2));
console.log(path.win32.relative(p1, p2));
console.log(path.relative('', p2));
console.log(path.relative(p1, p1));
