import fs from 'fs';

try{
    //getting file path
    const p = './gettingInformationAboutFile/file1.txt';
    //getting file stats
    let stats = fs.statSync(p);

    //log access time
    console.log(stats.atime);
    //log modification time
    console.log(stats.mtime);

    //update access and modification time to current time
    fs.utimesSync(p, new Date(), new Date());

    //getting file stats again
    stats = fs.statSync(p);
    
    //log access time
    console.log(stats.atime);
    //log modification time
    console.log(stats.mtime);
}
//catching error
catch(err){
    //log error message
    console.error(err.message);
}
