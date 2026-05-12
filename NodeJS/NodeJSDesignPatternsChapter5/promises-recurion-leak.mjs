function delay(milliseconds){
    //create and return a new Promise that rejects after the given milliseconds
    return new Promise((resolve, reject) => {
        //use setTimeout to reject the Promise after the specified delay
        setTimeout(() => {
            //resolve the Promise with the current date and time
            resolve(new Date());
        }, milliseconds)
    })
}
//function that demonstrates a promise recursion leak
function leakingLoop(){
    //wait 1 millisecond before continuing
    return delay(1).then(() => {
        //log the current timestamp
        console.log(`Tick ${Date.now()}`);
        //recursively call leakingLoop, causing a promise chain that never resolves
        return leakingLoop();
    })
}
//function that avoid promise recursion leak
function nonLeakingLoop() {
    //wait 1 millisecond before continuing
    delay(1).then(() => {
        //logs the current timestamp
        console.log(`Tick ${Date.now()}`);
        //calls nonLeakingLoop again without returning the promise, preventing a chain with recursion
        nonLeakingLoop();
    })
}
//function that avoid promise recursion leak and handle errors
function nonLeakingLoopWithErrors() {
    //create and return a new Promise
   return new Promise((resolve, reject) => {
    //internal function to handle the loop
    (function internalLoop() {
        //wait 1 millisecond before continuing
        delay(1).then(() => {
            //log the current timestamp
            console.log(`Tick ${Date.now()}`);
            //call internalLoop again to continue the process
            internalLoop();
            //handle any errors that occur during the delay
        }).catch(err => {
            //reject the outer Promise with the error
            reject(err);
        })
    })()
   })
}
//async function that avoids promise recursion leak
async function nonLeakingLoopAsync() {
    //infinite loop
    while(true){
        //wait 1 millisecond before continuing asynchronously
        await delay(1);
        //log the current timestamp
        console.log(`Tick ${Date.now()}`);
    }
}
//async function that demonstrates a promise recursion leak
async function leakingLoopAsync() {
    //wait 1 millisecond before continuing asynchronously
    await delay(1);
    //log the current timestamp
    console.log(`Tick ${Date.now()}`);
    //recursively call leakingLoopAsync, causing a promise chain that never resolves
    return leakingLoopAsync();
}
//invoke the leakingLoop function multiple times to demonstrate the recursion leak
for(let i = 0; i < 1e6; i++){
    leakingLoop();
}