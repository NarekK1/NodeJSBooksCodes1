import { spawn } from 'node:child_process';

//spawn a child process to execute the 'wc' command, which counts lines, words, and bytes in the input
const child = spawn('wc');

//pipe the standard input of the parent process to the standard input of the child process
process.stdin.pipe(child.stdin);

//listen for data events on the standard output of the child process and log the output to the console
child.stdout.on('data', data => {
    //log the output from the child process to the console
    console.log(`child stdout: \n${data}`);
});

