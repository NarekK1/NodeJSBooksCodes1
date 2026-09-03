import path from 'path';

//process.cwd() returns the current working directory of the Node.js process.
console.log('cwd: ' + process.cwd());
//path.resolve() resolves a sequence of paths or path segments into an absolute path.
console.log('cwd: ' + path.resolve());
//path.resolve() with a relative path resolves it against the current working directory.
console.log(path.resolve('./getFileNameWithCwdAndResolve.mjs'));