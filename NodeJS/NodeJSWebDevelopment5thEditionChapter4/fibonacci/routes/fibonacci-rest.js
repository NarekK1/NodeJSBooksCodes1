const express = require('express');
const router = express.Router();
const http =  require('http');
const math = require('../../math.js');


//render the page with the form to submit a number to calculate the fibonacci value of
router.get('/', function(req, res, next){
    //check if the query has a number
    if(req.query.n){
        //make a request to the server to get the fibonacci value of the number
        let httpreq = http.request({
            //use the environment variable for the port, default to 3002 if not set
            host: 'localhost',
            port: process.env.SERVERPORT,
            //path is the fibonacci route with the number from the query, rounded down to the nearest integer
            path: `/fibonacci/${Math.floor(req.query.fibonum)}`,
            method: 'GET'
        });
        //handle the response from the server
        httpreq.on('response', response => {
            //log the response status  code and headers
            response.on('data', chunk => {
            //log the response body and data time
            let data = JSON.parse(chunk);
            //log the response body and data time
            res.render('fibonacci', {
                //log the response body and data time
                title: "Calculate Fibonacci numbers",
                //log the response body and data time
                fibonum: req.query.fibonum,
                fiboval: data.result
            });
            });
            //log any errors from the response
            response.on('error', err => next(err));
        });
        //log any errors from the request
        httpreq.on('error', err => next(err));
        //end the request
        httpreq.end();
    }
    //if there is no number in the query, render the page with the form to submit a number to calculate the fibonacci value of
    else{
        //log the request time and path
        res.render('fibonacci', {
            title: "Calculate Fibonacci numbers",
            fiboval: undefined
        });
    }
});

//export the router to be used in the app.js file CommonJS style
module.exports = router;