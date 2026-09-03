import fs from 'fs'
 
//getting file stats synchronously
let stats = fs.statSync('./gettingInformationAboutFile/file1.txt');

//getting file access time
console.log(stats.atime);

//getting file access time in milliseconds since the UNIX epoch
console.log(stats.atimeMs);

//bigint option is used to get file access time in nanoseconds since the UNIX epoch
stats = fs.statSync('./gettingInformationAboutFile/file1.txt', { bigint: true });

//getting file access time in nanoseconds since the UNIX epoch
console.log(stats.atimeNs);