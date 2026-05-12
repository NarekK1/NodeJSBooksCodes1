import { readFile } from "fs";
//defines the readJSON function
function readJSON(filename, callback){
    //reads the file in utf-8 encoding
    readFile(filename, 'utf-8', function(err, data){
        //tries to parse the JSON data
        let parsed
        //handles errors
        if(err){
            // invokes the callback with the error
            return callback(err);
        }
        //tries to parse the JSON data
        try{
            //parses the JSON data
            parsed = JSON.parse(data);
        }
        //catches any parsing errors
        catch(err){
            //invokes the callback with the error
            return callback(err);
        }
        //invokes the callback with the parsed data
        callback(null, parsed);
    })
} 
//example usage of readJSON function
const cb = function(err, data){
    //handles errors
    if(err){
        //logs the error to the console
        return console.error(err)
    }
    //logs the parsed data to the console
    console.log(data);
}
//example usage of readJSON function
readJSON('valid_json.json', cb);
//example usage of readJSON function with invalid JSON
readJSON('invalid_json.json', cb);