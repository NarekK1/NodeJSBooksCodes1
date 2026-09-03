import path from 'path';

//absolute path
let p = 'C:\\Users\\Narek\\Desktop\\JavaScript\\NodeJS\\JSandNodeJSForWebDevelopmentDronovChapter16';

//check if the path is absolute
console.log(path.isAbsolute(p));
//check if the path is absolute using posix
console.log(path.posix.isAbsolute(p));

//relative path
p = '/JSandNodeJSForWebDevelopmentDronovChapter16/changingPaths';

//check if the path is absolute using win32
console.log(path.win32.isAbsolute(p));
//check if the path is absolute using posix
console.log(path.posix.isAbsolute(p));

//relative path
p = 'JSandNodeJSForWebDevelopmentDronovChapter16\\changingPaths';

//check if the path is absolute
console.log(path.isAbsolute(p));
//check if the path is absolute using win32
console.log(path.win32.isAbsolute(p));
//check if the path is absolute using posix
console.log(path.posix.isAbsolute(p));