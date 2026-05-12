//imports ansychronously the fs modules
import { promises as fs } from 'fs';
//lists the files in the current directory
async function listFiles(){
    //reads the current directory and returns an array of file names
    const files = await fs.readdir('.');
    //iterates over the array of file names and logs each file name to the console
    for(const file of files){
        //logs the file name to the console
        console.log(file);
    }
}
//calls the listFiles function and catches any errors that may occur
listFiles().catch(err => console.error(err));