//make a site visit calculator after every visit refresh the counter and show the number of visits to the site

import express from 'express';
import cookieParser from 'cookie-parser';

//create an instance of express application
const app = express();

//set a secret key to sign the cookies
const secret = 'mySecretKey';

//use cookie-parser middleware with a secret key to sign the cookies
app.use(cookieParser(secret));

//define a route to set a cookie with the number of visits to the site
app.get('/', (req, res) => {
    //initialize a variable to store the number of visits
    let visits = parseInt(req.cookies.visits) || 0;

    //increment the number of visits by 1
    visits++;

    //save the number of visits in a cookie named 'visits' with options to make it accessible for 1.30 hour duration
    res.cookie('visits', visits, { maxAge: 900000, httpOnly: true });

    //send a response to the client with the number of visits
    res.send(`You have visited this site ${visits} times!`);

});

//start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});