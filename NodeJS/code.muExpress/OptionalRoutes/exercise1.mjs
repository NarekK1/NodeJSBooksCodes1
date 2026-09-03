//make num 2 route optional by using the {/:num2} syntax in the route definition
import express from 'express';

//create an express app
const app = express();

//define a route with optional parameters
app.get('/test/:num1{/:num2}', (req, res) => {
    //send a response with the numbers provided in the URL
    res.send(`The numbers are ${req.params.num1} and ${req.params.num2 || 'not provided'}`);
});

//start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});