//make three route in first route write a session data in second route read the session data and in third route delete the session data

import express from 'express';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';

//create an instance of express application
const app = express();

//set a secret key to sign the cookies
const secret = 'mySecretKey';

//use cookie-parser middleware with a secret key to sign the cookies
app.use(cookieParser(secret));

//use express-session middleware with a secret key to sign the cookies
app.use(expressSession({ secret: secret }));

//define a route to write a session data
app.get('/', (req, res) => {
    //set a session variable named 'test' with value 'abcde'
    req.session.test = 'abcde';
    //send a response to the client
    res.send('Session data has been written!');
});

//define a route to read the session data
app.get('/read', (req, res) => {
    //check if the session variable named 'test' exists
    if(req.session.test){
        //send a response to the client with the session data
        res.send('Session data is: ' + req.session.test);
    }
    else{
        //send a response to the client if the session data does not exist
        res.send('Session data does not exist!');
    }
});

//define a route to delete the session data
app.get('/delete', (req, res) => {
    //delete the session variable named 'test'
    delete req.session.test;
    //log the session data to the console to check if it has been deleted
    console.log('Session data after deletion:', req.session.test);
    //send a response to the client
    res.send('Session data has been deleted!');
});

//start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});