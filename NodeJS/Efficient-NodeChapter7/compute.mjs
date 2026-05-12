//simulate a long computation
const longComputation = () => {
    let sum = 0;
    //a for loop that simulates a long computation by summing numbers from 0 to 1e9
    for(let i = 0; i < 1e9; i++){
        //simulate some work
        sum += i;
    }
    //return the result
    return sum;
};

//listen for messages from the parent process
process.on('message', msg => {
    //perform the long computation
    const sum = longComputation();
    //send the result back to the parent process
    process.send(sum);
});