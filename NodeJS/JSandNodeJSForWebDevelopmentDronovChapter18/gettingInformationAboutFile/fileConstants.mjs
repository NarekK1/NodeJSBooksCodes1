import fs from 'fs';

// These constants are used to determine the type of a file when using fs.stat or fs.lstat
// S_IFMT is a bitmask that can be used to extract the file type from the mode field of the stat object
console.log(fs.constants.S_IFMT);
//S_IFDIR is a constant that represents a directory
console.log(fs.constants.S_IFDIR);
//S_IFREG is a constant that represents a regular file
console.log(fs.constants.S_IFREG);
//S_IFCHR is a constant that represents a character device file
console.log(fs.constants.S_IFCHR);
//S_IFBLK is a constant that represents a block device file
console.log(fs.constants.S_IFLNK);