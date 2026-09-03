import fs from 'fs';

//variable p is the path to the file we want to truncate
const p = './changingFileSize/file2.txt';

//first we check the size of the file before truncating it
console.log(fs.statSync(p).size);

//open the file in read/write mode and truncate it to 10 bytes, then check the size again
fs.open(p, 'r+', function(err, fd){
    //if there is an error, we throw it
    if(err){
        throw err;
    }
    //after truncating the file, we check the size again
    fs.ftruncate(fd, 10, function(err){
        //close the file descriptor after truncating the file
        fs.closeSync(fd);
        //if there is an error, we throw it
        if(err){
            throw err;
        }
        //after truncating the file, we check the size again
        console.log(fs.statSync(p).size);
    });
});