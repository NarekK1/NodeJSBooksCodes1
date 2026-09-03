//write into a cookie the time of the visiting the site and at refresing the page show the time of how long ago the user visited the site

import express from 'express';
import cookieParser from 'cookie-parser';

//create an instance of express application
const app = express();

//set a secret key to sign the cookies
const secret = 'mySecretKey';

//use cookie-parser middleware with a secret key to sign the cookies
app.use(cookieParser(secret));

//define a route to set a cookie with the time of the visiting the site
app.get('/', (req, res) => {
    //set a cookie named 'lastVisit' with the current time and options to make it accessible for 1 hour duration
    res.cookie('lastVisit', new Date().toISOString(), {
        maxAge: 1000 * 60 * 60
    });
    //check if the cookie is accessible in the root route
    if(req.cookies.lastVisit){
        //send a response to the client if the cookie is accessible
        res.send('Welcome back! Your last visit was at: ' + req.cookies.lastVisit);
    }
    else{
        //send a response to the client if the cookie is not accessible
        res.send('Welcome! This is your first visit.');
    }
});

//start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});