import path from 'path';

//the platform-specific path delimiter, ';' or ':'
console.log(path.delimiter);
console.log(path.win32.delimiter);
console.log(path.posix.delimiter);
