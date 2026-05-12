//imports readFile function from the 'fs' module ansychronously
import { channel } from 'diagnostics_channel';
import { readFile } from 'fs';
//creates a new Map object to be used as a cache
const cache = new Map();
//defines the incositentRead function
function iconsistentRead(filename, cb){
    //checks if the filename is already in the cache
    if(cache.has(filename)){
        //involed sychronously
        process.nextTick(() => cb(cache.get(filename)));
    }
    //if the filename is not in the cache, reads the file ansychronously
    else{
        //read the file in utf-8 encoding
        readFile(filename, 'utf-8', function(err, data){
            //if there is an error, invokes the callback with the error
            cache.set(filename, data);
            //invokes the callback with the data
            cb(data);
        })
    }
}
//defines the createFileReader function
function createFileReader(filename){
    //creates an array to hold listeners
    const listeners = [];
    //calls the iconsistentRead function with the filename and a callback function
   iconsistentRead(filename, function(value){
    //invokes each listener with the value
    listeners.forEach(listener => listener(value));
   })
   //returns an object with an onDataReady method
   return {
    //pushes the listener to the listeners array
    onDataReady: listener => listeners.push(listener)
   }
}
//creates a file reader for 'data.txt'
const reader1 = createFileReader('data.txt');
//registers a listener to log the data when it is ready
reader1.onDataReady(function(data){
    console.log(`First call data: ${data}`);
    //creates another file reader for 'data.txt' 
    const reader2 = createFileReader('data.txt');
    //registers a listener to log the data when it is ready 
    reader2.onDataReady(function(data){
        //logs the data to the console
        console.log(`Second call data: ${data}`);
    })
});
//