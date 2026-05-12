const express = require('express');
const router = express.Router();
const math = require('../../math.js');


//define a route for the root path of the router, which will handle GET requests
router.get('/', function(req, res, next){
    //check if the query parameter 'fibonum' is present in the request
    if(req.query.fibonum){
        //cacluate the Fibonacci value using the math.fibonacciAsync function and pass it to the view
        math.fibonacciAsync(req.query.fibonum, (err, fiboval) => {
            //handle any errors that occur during the asynchronous calculation of the Fibonacci value
            if(err){
                //if an error occurs, call the next function with the error to pass it to the error handling middleware
                next(err);
            }
            //if no error occurs, render the 'fibonacci' view with the calculated Fibonacci value
            else{
                //render the 'fibonacci' view with the calculated Fibonacci value
                res.render('fibonacci', {
                    //pass the title, the value of 'fibonum' from the query parameters, and the calculated Fibonacci value to the view
                    title: 'Calculate Fibonacci numbers',
                    fibonum: req.query.fibonum,
                    fiboval: fiboval
                })
            }
        })
    }
    //if the 'fibonum' query parameter is not present, render the 'fibonacci' view without a Fibonacci value
    else{
        //render the 'fibonacci' view without a Fibonacci value
        res.render('fibonacci', {
            //pass the title and set the 'fiboval' variable to undefined to indicate that no Fibonacci value is available
            title: 'Calculate Fibonacci numbers',
            fiboval: undefined
        })
    }
});

//export the router object so that it can be used in other parts of the application
module.exports = router;