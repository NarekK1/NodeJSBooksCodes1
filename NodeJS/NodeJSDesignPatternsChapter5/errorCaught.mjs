function delayError(milliseconds){
    //create and return a new Promise that rejects after the given milliseconds
    return new Promise((resolve, reject) => {
        //use setTimeout to reject the Promise after the specified delay
        setTimeout(() => {
            //reject the Promise with an Error
            reject(new Error(`Error after ${milliseconds}ms`));
        }, milliseconds)
    })
}
//async function that demonstrates catching errors with try-catch
async function errorCaught(){
    //use try-catch to handle the rejected Promise
    try{
        //await the Promise that will reject after 1 second
        return await delayError(1000);
    }
    //catch the error thrown by the rejected Promise
    catch(err){
        //log the error message
        console.error('Error caught by the async function: ' + err.message);
    }
}
//call the async function and handle any uncaught errors
errorCaught().catch(err => console.error('Error caught by caller: ' + err.message));