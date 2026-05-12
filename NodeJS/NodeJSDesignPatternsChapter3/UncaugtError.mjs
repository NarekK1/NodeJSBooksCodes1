import { readFileSync } from 'fs';
//function that reads a JSON file and throws uncaught errors
function readJSONThrows(filename, callback){
    //reads the file synchronously
    readFile(filename, 'utf8', function(err, data){
        //handles errors
        if(err){
            //invokes the callback with the error
            return callback(err);
        }
        //invokes the callback with the parsed data
        callback(null, JSON.parse(data));
    })
}

//example usage of readJSONThrows function
try{
    //this will throw an uncaught exception for invalid JSON
    readJSONThrows('invalid_json.json', err => console.error(err));
}
//this catch block will NOT catch the JSON parsing exception
catch(err){
    console.log('This will NOT catch the JSON parsing exception');
}
//global handler for uncaught exceptions
process.on('uncaughtException', function(err){
    console.error(`Tihs will catch at last the JSON parsing exception:${err.message}`);
    process.exit(1);
})