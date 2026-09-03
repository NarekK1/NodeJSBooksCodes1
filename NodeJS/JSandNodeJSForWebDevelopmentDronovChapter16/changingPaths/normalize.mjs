import path from 'path';


let p = 'C:\\Users\\Narek\\Desktop\\JavaScript\\NodeJS\\JSandNodeJSForWebDevelopmentDronovChapter16\\changingPaths\\file.txt'

//normalize() method normalizes the given path, resolving '..' and '.' segments and removing redundant separators.
console.log(path.normalize(p));
//normalize method with win32 will treat both forward slashes and backslashes as path separators
console.log(path.win32.normalize(p));

p = '/JSandNodeJSForWebDevelopmentDronovChapter16/changingPaths/file.txt';

//normalize method with posix will treat only forward slashes as path separators
console.log(path.posix.normalize(p));

p = 'C:/Users\\Narek\\Desktop\\JavaScript\\NodeJS\\JSandNodeJSForWebDevelopmentDronovChapter16\\changingPaths/file.txt'

//normalize method with win32 will treat both forward slashes and backslashes as path separators
console.log(path.win32.normalize(p));

p = '';

//normalize method with an empty string will return '.'
console.log(path.normalize(p));