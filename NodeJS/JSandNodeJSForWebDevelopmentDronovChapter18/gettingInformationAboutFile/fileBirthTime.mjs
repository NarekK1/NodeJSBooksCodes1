import fs from 'fs';

//getting file stats synchronously
let stats = fs.statSync('./gettingInformationAboutFile/file1.txt');

//getting file birth time
console.log(stats.birthtime);

//getting file birth time in milliseconds since the UNIX epoch
console.log(stats.birthtimeMs);

//getting file birth time in nanoseconds since the UNIX epoch
stats = fs.statSync('./gettingInformationAboutFile/file1.txt', { bigint: true });

//getting file birth time in nanoseconds since the UNIX epoch
console.log(stats.birthtimeNs);