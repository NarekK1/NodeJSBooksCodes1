import fs from 'fs';

//constants.F_OK check if the file is visible to the calling process.
console.log(fs.constants.F_OK);
//constants.X_OK check if the file is executable by the calling process.
console.log(fs.constants.X_OK);
//constants.W_OK check if the file is writable by the calling process.
console.log(fs.constants.W_OK);
//constants.R_OK check if the file is readable by the calling process.
console.log(fs.constants.R_OK);
//checks if the file is readable and writable by the calling process.
console.log(fs.constants.R_OK | fs.constants.W_OK);