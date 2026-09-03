//write session user entry data and at refresh display how many seconds have user entered the page.

import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';

//create an express app
const app = express();

//create a secret key for the session and cookie
const secret = 'mySecretKey';

//use cookie-parser middleware to parse the cookies
app.use(cookieParser(secret));

//use express-session middleware to manage sessions
app.use(session({ secret: secret }));

//create a route to display the user entry data and refresh count
app.get('/', (req, res) => {
    //check if the session variable 'entryTime' exists, if not initialize it to the current time
    if(!req.session.entryTime){
        //initialize the session variable 'entryTime' to the current time
        req.session.entryTime = Date.now();

        //send the response with the current value of the session variable 'entryTime'
        res.send(`You have entered this page at ${new Date(req.session.entryTime).toLocaleTimeString()}.`);
    }
    else{
        //calculate the time difference in seconds
        const timeDiff = Math.floor((Date.now() - req.session.entryTime) / 1000);

        //send the response with the current value of the session variable 'entryTime' and time difference
        res.send(`You have entered this page at ${new Date(req.session.entryTime).toLocaleTimeString()}. You have refreshed this page after ${timeDiff} seconds.`);
    }
});

//start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});