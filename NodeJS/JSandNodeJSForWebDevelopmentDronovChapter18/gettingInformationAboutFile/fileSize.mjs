import fs from 'fs';

//getting the stats of the file
const stat = fs.statSync('./gettingInformationAboutFile/file1.txt');
//getting the size of the file
console.log(stat.size);