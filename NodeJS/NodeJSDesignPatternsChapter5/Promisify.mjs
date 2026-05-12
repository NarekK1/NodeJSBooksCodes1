//import the 'crypto' module to use the randomBytes function
import { randomBytes } from 'crypto';
//function that converts a callback-based API to a Promise-based one
function promisify(callbackBasedApi){
    //return a new function that returns a Promise
    return function promisified(...args){
        //create and return a new Promise
        return new Promise((resolve, reject) => {
            //create a new array of arguments that includes the original arguments and a callback function
            const newArgs = [ 
                //spread the original
                ...args,
                //add a callback function that resolves or rejects the Promise
                function (err, result){
                    //if there's an error, reject the Promise
                    if(err){
                        return reject(err);
                    }
                    //otherwise, resolve the Promise with the result
                    resolve(result);
                }
            ]
            //call the original callback-based API with the new arguments
            callbackBasedApi(...newArgs);
        })
    }
}
//example usage: promisify the randomBytes function from the crypto module
const randomBytesP = promisify(randomBytes);
//call the promisified function and log the result
randomBytesP(32).then(buffer => console.log(`Random bytes: ${buffer.toString()}`));