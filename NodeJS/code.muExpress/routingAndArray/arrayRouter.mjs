import express from 'express';

//create an instance of express 
const app = express();

//create an array of strings
const arr = ['a', 'b', 'c'];

//create a route that takes a number as a parameter and returns the corresponding string from the array
app.get('/test/:num/', function(req, res){
    //get the number from the request parameters
    res.send(arr[req.params.num]);
});

//start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});