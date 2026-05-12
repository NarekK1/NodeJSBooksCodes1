
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
//flag to control synchrounous error throwing in the async function
async function playingWithErrors(throwSyncError){
    //set to true to throw a synchronous error
    try{
        //set this flag to true to test synchronous error handling
        if(throwSyncError){
            //immediately throw a synchronous error
            throw new Error('This is a synchronous error');
        }
        //await the Promise that will reject after 1 second
        await delayError(1000);
    }
    //handle both sychronous and asynchronous errors here
    catch(err){
        //log the error message
        console.log(`We have an error: ${err.message}`);
    }
    //execute this block regardless of errors
    finally{
        console.log('Done');
    }
}
playingWithErrors(true);
playingWithErrors(false);