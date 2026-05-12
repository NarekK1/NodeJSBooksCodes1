//imports the fs module and uses the promises API CommonJS style
const fs = require('fs').promises;

//lists the files in the current directory
async function listFiles(){
    //tries to read the current directory and log the file names to the console
    try{
        //sets the directory to the current directory or to the directory passed as a command line argument
        let dir = '.';
        //if a directory is passed as a command line argument, it reads that directory instead
        if(process.argv[2]){
            //reads the directory passed as a command line argument and returns an array of file names
            const files = await fs.readdir(dir);
        }
        //iterates over the array of file names and logs each file name to the console
        for(let fn of files){
            console.log(fn);
        }
    }
    //catches any errors that may occur and logs them to the console
    catch(err){
        console.error(err);
    }
}
//calls the listFiles function
listFiles();