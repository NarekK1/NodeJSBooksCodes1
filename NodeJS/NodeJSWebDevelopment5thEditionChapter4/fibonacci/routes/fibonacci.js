const express = require('express');
//create a new router object using express.Router() method
const router = express.Router();

//import the math module to use the fibonacci function
const math = require('../../math.js');
//define a route for the root path of the router, which will handle GET requests
router.get('/', function(req, res){
    //check if the query parameter 'fibonum' is present in the request
    if(req.query.fibonum){
        //if the 'fibonum' query parameter is present, render the 'fibonacci' view
        res.render('fibonacci', {
            //pass the title
            title: 'Calculate Fibonacci numbers',
            //pass the value of 'fibonum' from the query parameters
            fibonum: req.query.fibonum,
            //calculate the Fibonacci value using the math.fibanacci function and pass it to the view
            fiboval: math.fibonacci(req.query.fibonum)
        });
    }
    //if the 'fibonum' query is not present, render the 'fibonnaci' view
        else{
            //render the 'fibonacci' view 
            res.render('fibonacci', {
                //pass the title
                title: 'Calculate Fibonacci numbers',
                //set the 'fibonum' variable to undefined
                fiboval:undefined
            });
            }
});
//export the router object so that it can be used in other parts of the application
module.exports = router;