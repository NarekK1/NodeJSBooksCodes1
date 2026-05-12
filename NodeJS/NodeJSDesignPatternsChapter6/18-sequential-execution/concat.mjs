import { concatFiles  } from "./concat-files.mjs";

//main function to execute concatenation based on command-line arguments
async function main(){
    //use a try-catch block to handle errors
    try{
        //call concatFiles with destination and source files from command-line arguments
        await concatFiles(process.argv[2], process.argv.slice(3));
    }
    //catch and log any errors
    catch(err){
        //log the error
        console.error(err);
        //exit with failure code 1
        process.exit(1);
    }
    //log success message
    console.log('All files concatenated successfully');
}
main();