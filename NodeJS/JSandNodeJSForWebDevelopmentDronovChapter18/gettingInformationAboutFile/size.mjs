import fs from 'fs';

//getting the stats of the file
const stats = fs.statSync('./gettingInformationAboutFile/file1.txt');

//getting the size of the file
console.log(stats.mode);
//getting the size of the file in binary
console.log(stats.mode.toString(2));

//checking if the file is a directory or a regular file
if((stats.mode & fs.constants.S_IFDIR) != 0){
    //if the file is a directory log it
    console.log('This is a directory');
}

//checking if the file is a regular file
else if((stats.mode & fs.constants.S_IFREG) != 0){
    //if the file is a regular file log it
    console.log('This is a file');
}