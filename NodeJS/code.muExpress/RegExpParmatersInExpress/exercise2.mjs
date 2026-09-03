import express from 'express';

//create an instance of the express application
const app = express();

//route to handle GET requests to '/admin' or '/user' or '/username' and send a response indicating the matched route
app.get(/^\/(admin|user(name)?)$/, (req, res) => {
    //send a response indicating the matched route
    res.send(`Matched route ${req.path}`);
});

//start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});