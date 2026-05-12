
//function that returns a Promise that resolves after a specified delay
function delay(milliseconds) {
    //create and return a new Promise
    return new Promise((resolve, reject) => {
        //use setTimeout to resolve the Promise after the given milliseconds
        setTimeout(() => resolve(new Date()), milliseconds); 
    })
}
async function playingWithDelays() {
    console.log('Delaying ...', new Date());

    //wait for 1 second
    const dateAfterOneSecond = await delay(1000);
    //log the date after the delay
    console.log(dateAfterOneSecond);

    //wait for 3 seconds
    const dateAfterThreeSeconds = await delay(3000);
    //log the date after the delay
    console.log(dateAfterThreeSeconds);
    return 'done';
}
//call the async function and log the final result
playingWithDelays().then(result => console.log(`After 4 seconds: ${result}`));