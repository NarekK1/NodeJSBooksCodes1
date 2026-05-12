const math = require('../math.js');

//loop throug numbers from 1 to 7999 and calculate the Fibonacci value
(async () => {
    //use a for loop to iterate through numbers from 1 to 7999
    for(let num = 1; num < 8000; num++){
        //use the fibonacciAsync function to calcuulate the Fibonacci value for the current number and log the result with a timestamp
        await new Promise((resolve, reject) => {
            //call the fibonacciAsync function with the current number and a callback to handle the result
            math.fibonacciAsync(num, (err, fibo) => {
                //handle any errors that occur during the asynchronous calculation of the Fibonacci value
                if(err){
                    //if an error occurs, log the error and reject the promise
                    reject(err);
                }
                //if no error occurs, log the Fibonacci value with a timestamp and resolve the promise
                else{
                    //log the Fibonacci value with a timestamp
                    let now = new Date().toISOString();
                    //log the Fibonacci value for the current number with a timestamp
                    console.log(`${now} Fibonacci for ${num} = ${fibo}`);
                    //resolve the promise to indicate that the asynchronous operation is complete
                    resolve();
                }
            })
        })
    }
})
//call the immediately invoked async function and catch any errors that occur during its execution
().catch(err => console.error(err));