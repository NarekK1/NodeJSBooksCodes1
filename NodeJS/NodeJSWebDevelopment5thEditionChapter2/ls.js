//imports the fs module and uses the promises API
const fs = require('fs').promises;

//lists the files in the current directory
async function listFiles(){
    //tries to read the current directory and log the file names to the console
    try{
        //reads the current directory and returns an array of file names
        const files = await fs.readdir('.');
        //iterates over the array of file names and logs each file name to the console
        for(const file of files){
            //logs the file name to the console
            console.log(file);
        }
    }
    //catches any errors that may occur and logs them to the console
    catch(err){
        console.error(err);
    }
}
//calls the listFiles function
listFiles();