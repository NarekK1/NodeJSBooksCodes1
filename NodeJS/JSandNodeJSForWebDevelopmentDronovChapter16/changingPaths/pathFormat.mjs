import path from 'path';

// The path.format() method returns a path string from an object, the opposite of path.parse().
//get the path string 
const p = 'C:\\Users\\Narek\\Desktop\\JavaScript\\NodeJS\\JSandNodeJSForWebDevelopmentDronovChapter16\\changingPaths\\test.txt';
//get the object from the path string
const obj = path.parse(p);

//the object contains the following properties:
console.log(obj);

//logs the path string from the object
console.log(path.format(obj));
//logs the path string from the object using the win32 format
console.log(path.win32.format(obj));


console.log( path.format({ 
   dir: 'C:\\book\\p1', 
   base: 'test.txt' 
}) );                                    
// C:\book\p1\test.txt 
console.log( path.format({ 
   root: 'C:\\Users\\Narek\\Desktop\\JavaScript\\NodeJS\\JSandNodeJSForWebDevelopmentDronovChapter16\\changingPaths', 
   ext: '.txt', 
   name: 'test' 
}) );             