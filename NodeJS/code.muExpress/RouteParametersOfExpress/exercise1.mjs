//square number using express route parameters

import express from 'express';

//create an instance of the express application
const app = express();

//number to be squared
const num = 5;

//route to handle GET requests to '/square/:num' and send the square of the number as a response
app.get('/square/:num', (req, res) => {
    //send the square of the number as a response
    res.send(req.params.num * 2);
});

//start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});