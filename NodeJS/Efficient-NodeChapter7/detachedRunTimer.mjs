import { spawn } from 'child_process';

//spawn a child process to execute the 'node' command with the 'timer.mjs' file as an argument
const child = spawn('node', ['timer.mjs'], {
    //set the detached option to true to allow the child process to run independently of the parent process
    detached: true,
    //set the stdio option to 'ignore' to prevent the child process from inheriting the standard input, output, and error streams of the parent process
    stdio: 'ignore'
});

//unref the child process to allow the parent process to exit independently of the child process
child.unref();