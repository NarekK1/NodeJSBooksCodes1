//arrange given routes in order of priority
import express from 'express';

//create an instance of the express application
const app = express();

 //this route will be matched first because it is more specific than the other two routes
app.get('/test/show/all', (req, res) => {
   //send a response to the client
    res.send('This is a test route to show all');
});

//this route will be matched second because it is more specific than the last route
app.get('/test/show/:num', (req, res) => {
    //send a response to the client
    res.send(`This is a test route to show ${Number(req.params.num)}`);
});

//this route will be matched last because it is the least specific of the three routes
app.get('/test/show/:num1/:num2', (req, res) => {
    //send a response to the client
    res.send(`This is a test route to show ${Number(req.params.num1)} and ${Number(req.params.num2)}`);
});

//start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});