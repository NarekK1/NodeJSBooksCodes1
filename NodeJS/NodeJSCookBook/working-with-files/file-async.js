//imports file system from Node Library
const fs = require("fs");

//import path from Node Library
const path = require("path");

// returns the current directory of the Node.js process
const filepath = path.join(process.cwd(), "hello.txt");

//read file ansynchronously with uft 8 format
fs.readFile(filepath, "utf8", function(err, contents){
    //returns error
    if(err){
    console.log(err);
    }
    console.log("File Contents:", contents);

    //converts content to uppercase
    const upperContents = contents.toUpperCase();
    
    //calling the updateFile function
    updateFile(filepathm, upperContents);
        
});

function updateFile(filepath, contents){
       //write into file synchronously
    fs.writeFile(filepath, upperContents, function(err){
        //checks if there is error
        if(err){
            throw err;
        }
        console.log("File updated.");
    })


}
setInterval(() => process.stdout.write("*** \n"), 1).unref();