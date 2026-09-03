//make one route for first entry install the cookie and second entry log the cookie

import express from 'express';
import cookieParser from 'cookie-parser';

//create an express app
const app = express();

//set secret key for signing cookies
const secretKey = 'mySecretKey';

//use cookie parser middleware and pass the secret key to it
app.use(cookieParser(secretKey));

//route to set a cookie and log to the console
app.get('/', (req, res) => {
    if(!req.cookies.test){
        //set a cookie named 'test' with value 'Hello, World!'
        res.cookie('test', 'Hello, World!');
        //send response to the client
        res.send('Cookie has been set!');
    }
    else{
        //log the cookie to the console
        console.log(req.cookies);
        //send response to the client
        res.send('Cookie has been logged to the console!');
    }
});

//start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});