import fs from 'fs';

//get the stats of the file
let stats = fs.statSync('./gettingInformationAboutFile/file1.txt');

//ctime is the time when the file was created since the Unix epoch
console.log(stats.ctime);
//ctimeMs is the time when the file was created in milliseconds since the Unix epoch
console.log(stats.ctimeMs);

//bigint option allows us to get the time in bigint format
stats = fs.statSync('./gettingInformationAboutFile/file1.txt', { bigint: true });

//ctime is the time when the file was created since the Unix epoch in bigint format
console.log(stats.ctimeMs);