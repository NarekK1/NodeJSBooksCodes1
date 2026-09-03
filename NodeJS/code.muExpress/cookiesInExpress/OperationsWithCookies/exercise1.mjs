//make three routes in first write data to cookie, second log the cookie and third delete the cookie

import express from 'express';
import cookieParser from 'cookie-parser';

//create an express app
const app = express();

//set secret key for signing cookies
const secretKey = 'mySecretKey';

//use cookie parser middleware and pass the secret key to it
app.use(cookieParser(secretKey));

//route to set a cookie
app.get('/', (req, res) => {
    //set a cookie named 'test' with value 'Hello, World!' 
    res.cookie('test', 'Hello, World!');
    //send response to the client
    res.send('Cookie has been set!');
});

app.get('/log', (req, res) => {
    //log the cookie to the console
    console.log(req.cookies);
    //send response to the client
    res.send('Cookie has been logged to the console!');
});

app.get('/delete', (req, res) => {
    //delete the cookie named 'test'
    res.clearCookie('test');
    //send the response to the client
    res.send('Cookie has been deleted!');
    //log the cookies to the console after deletion
    console.log(req.cookies);
});

//start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});