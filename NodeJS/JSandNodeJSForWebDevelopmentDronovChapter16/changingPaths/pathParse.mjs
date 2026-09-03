import path from 'path';

// The path.parse() method returns an object whose properties represent significant elements of the path. These properties are: root, dir, base, ext, and name.
//get the path of the file
let p = 'C:\\Users\\Narek\\Desktop\\JavaScript\\NodeJS\\JSandNodeJSForWebDevelopmentDronovChapter16\\changingPaths\\test.txt';

//log the path object
console.log(path.parse)

//get the path of the file
p = 'C:\\Users\\Narek\\Desktop\\JavaScript\\NodeJS\\JSandNodeJSForWebDevelopmentDronovChapter16\\changingPaths\\test\\';
//log the path object for win32
console.log(path.win32.parse(p));

//get the path of the file
p = './p1/test';
//log the path object for posix
console.log(path.posix.parse(p));