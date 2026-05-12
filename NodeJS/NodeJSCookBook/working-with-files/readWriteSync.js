//imports file system from Node Library
const fs = require("fs");

//import path from Node Library
const path = require("path");
//creates a variable to store the file path of hello.txt
// returns the current directory of the Node.js process
const filepath = path.join(process.cwd(), "hello.txt");

//synchronously read the file contents with utf 8 format
const contents = fs.readFileSync(filepath, "utf8");
console.log("File Contents:", contents);

//edits the content of the file and converts the lowercase text  into uppercase:
const upperContents = contents.toUpperCase();

//updates the file
fs.writeFileSync(filepath, upperContents);
console.log("File updated.")