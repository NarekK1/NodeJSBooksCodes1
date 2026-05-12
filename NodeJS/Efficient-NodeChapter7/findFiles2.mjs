import { exec } from 'child_process';

//execute the 'find' command to find all files in the current directory
exec('find . -type f | wc -l', (err, stdout, stderr) => {
    //handle any errors that occur during the execution of the command
    if(err){
        //log the error to the console and return
        console.error(`exec error: ${err}`);
        return;
    }
    //log the number of files found to the console
    console.log(`Number of files ${stdout}`);
});