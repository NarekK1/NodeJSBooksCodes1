//sum of two numbers using express route parameters
import express from 'express';

//create an instance of the express application
const app = express();

//route to handle GET requests to '/sum/:num1/:num2' and send the sum of the two numbers as a response
app.get('/sum/:num1/:num2', (req, res) => {
    //send the sum of the two numbers as a response
    res.send(Number(req.params.num1) + Number(req.params.num2));
});

//start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
})