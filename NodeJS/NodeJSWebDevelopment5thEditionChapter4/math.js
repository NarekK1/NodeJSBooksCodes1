//exports fibonacci function using CommonJS syntax
exports.fibonacci = function(n) {
    //base cases for fibonacci sequence
    if(n === 0 ){
        return 0;
    }
    else if(n === 1 || n === 2){
        return 1;
    }
    //recursive case for fibonacci sequence
    else{
        return exports.fibonacci(n - 1) + exports.fibonacci(n - 2);
    }
}

//exports fibonacciLoop function using CommonJS syntax
exports.fibonacciLoop = function(n){
    //base cases for fibonacci sequence
    let fibos = [];
    //initialize the first three values of the fibonacci sequence
    fibos[0] = 0;
    fibos[1] = 1;
    fibos[2] = 1;

    //loop to calculate fibonacci values from 3 to n
    for(let i = 3; i <= n; i++){
        //calculate the fibonacci value for the current index
        fibos[i] = fibos[i - 2] + fibos[i - 1];
    }
    //return the fibonacci value for n
    return fibos[n];
}

//exports fibonacciAsync function using CommonJS syntax
module.exports.fibonacciAsync = function(n, done){
    //base cases for fibonacci sequence
    if(n === 0){
        //call the done callback with the result for the base case of 0
        done(undefined, 0);
    }
    //base cases for fibonacci sequence    
    else if(n === 1 || n === 2){
        //call the done callback with the result for the base cases of 1 and 2
        done(undefined, 1);
    }
    //recursive case for fibonacci sequence using asynchronous callbacks
    else{
        //use setImmediate to defer the execution of the reursive calls
        setImmediate(() => {
            //call the fibonacciAsync function recursively for n - 1
            exports.fibonacciAsync(n - 1, (err, val1) => {
                //handle any errors that occur during the recursive call for n - 1
                if(err){
                    //if an error occurs, call the done callback with the error
                    done(err);
                }
                //if no error occurs, proceed to call the fibonacciAsync function recursively for n - 2
                else{
                    setImmediate(() => {
                        //call the fibonacciAsync function recursively for n - 2
                        exports.fibonacciAsync(n - 2, (err, val2) => {
                            //handle any errors that occur during the recursive call for n - 2
                            if(err){
                                //if an error occurs, call the done callback with the eror
                                done(err);
                            }
                            //if no error occurs, calculate the fibonacci value for n by summing the results
                            else{
                                done(undefined, val1 + val2);
                            }
                        })
                    })
                }
            })
        })
    }
}