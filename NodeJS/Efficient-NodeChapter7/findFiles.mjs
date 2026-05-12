import { spawn } from 'child_process';

//spawn a child process to execute the 'find' command to find all files in the current directory and its subdirectories
const find = spawn('find', ['.', '-type', 'f']);
//spawn a child process to execute the 'wc' command with the '-' option to count the number of lines in the input
const wc = spawn('wc', ['-l']);

//pipe the standard output of the 'find' process to the standard input of the 'wc' process
find.stdout.pipe(wc.stdin);

//listen for data events on the standard output of the 'wc' process and log the output to the console
wc.stdout.on('data', data => {
    console.log(`Number of files: ${data}`);
})