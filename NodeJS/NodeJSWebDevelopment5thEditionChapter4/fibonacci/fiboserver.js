const math = require('../math.js');
const express = require('express');
const loger = require('morgan');
const app = express();

//use morgan to log requests to the console
app.use(loger('dev'));
//define a route for the Fibonacci endpoint
app.get('/fibonacci/:n', (req, res, next) => {
    //call the asynchronous Fibonacci function from math.js
    math.fibonacciAsync(Math.floor(req.params.n), (err, val) => {
        //handle any errors that occur during the Fibonacci calculation
        if(err){
            //pass the error to the next middleware function 
            next(`FIBO SERVER ERROR ${err}`);
        }
        //send the result back to the client as a JSON object
        else{
            res.send({ n: req.params.n, result: val });
        }
    });
});
//start the server and listen on the specified port
app.listen(process.env.SERVERPORT);