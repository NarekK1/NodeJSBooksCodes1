//Create a page refresh counter during sessions. 

import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';

//create an express app
const app = express();

//create a secret key for the session and cookie
const secret = 'mySecretKey';

//use body-parser middleware to parse the request body
app.use(bodyParser.urlencoded({ extended: true }));

//use cookie-parser middleware to parse the cookies
app.use(cookieParser(secret));

//use express-session middleware to manage sessions
app.use(session({ secret: secret }));

//create a route to display the calculator form
app.get('/', (req, res) => {
    //check if the session variable 'counter' exists, if not initialize it to 0
    if(!req.session.cookie){
        //initalize the session variable 'counter' to 0
        req.session.counter = 0;
    }
    //increment the session variable 'counter' by 1
    req.session.counter++;
    //send the response with the current value of the session variable 'counter'
    res.send(`You have refreshed this page ${req.session.counter} times during this session.`);
});

//start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});