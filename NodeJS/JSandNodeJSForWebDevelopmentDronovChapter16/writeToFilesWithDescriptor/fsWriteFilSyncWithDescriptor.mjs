import fs from 'fs';

let fd;

try {
    fd = fs.openSync('./writeToFilesWithDescriptor/file2.txt', 'w');
    console.log(`File opened successfully. fd = ${fd}`);
    console.log(fs.writeSync(fd, 'String1'));
    const buf = Buffer.from('\nString2', 'utf8');
    console.log(fs.writeSync(fd, buf));
}
catch(err){
    console.error(err.message);
}
finally {
    if(fd !== undefined){
        fs.closeSync(fd);
        console.log('File closed');
    }
}

console.log('Program ended');