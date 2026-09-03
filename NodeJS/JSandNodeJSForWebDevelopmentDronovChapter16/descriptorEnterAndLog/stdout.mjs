//log the file descriptors for stdin, stdout, and stderr to the console. 
console.log(process.stdin.fd);
console.log(process.stdout.fd);
console.log(process.stderr.fd);