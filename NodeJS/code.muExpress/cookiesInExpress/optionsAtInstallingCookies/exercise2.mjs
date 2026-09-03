//set any cookie for month duration

import express from 'express';
import cookieParser from 'cookie-parser';

//create an instance of express application
const app = express();

//set a secret key to sign the cookies
const secret = 'mySecretKey';

//use cookie-parser middleware with a secret key to sign the cookies
app.use(cookieParser(secret));

//define a route to set a cookie with a name and value for month duration
app.get('/', (req, res) => {
    //set a cookie named 'test' with value 'abcde' and options to make it accessible for month duration
    res.cookie('test', 'abcde', {
        maxAge: 1000 * 60 * 60 * 24 * 30
    });
    //send a response to the client
    res.send('Cookie has been set for month duration!');
});

//start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});