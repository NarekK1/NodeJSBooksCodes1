//with form help ask for username write it to cookie and at next visit greet the user with his name

import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

//create an instance of express application
const app = express();

//use body-parser middleware to parse the request body
app.use(bodyParser.urlencoded({ extended: true }));

//set a secret key to sign the cookies
const secret = 'mySecretKey';

//use cookie-parser middleware with a secret key to sign the cookies
app.use(cookieParser(secret));

//define a route to display a form to ask for username
app.get('/', (req, res) => {
    //check if the cookie is accessible in the root route
    if(req.cookies.username){
        //send a response to the client if the cookie is accessible
        res.send('Welcome back,motherfucker ' + req.cookies.username + '!');
    }
    else{
        //send a form to the client to ask for username if the cookie is not accessible
        res.send(
            `<form action="" method="POST">
                <label for="username">Enter your username:</label>
                <input type="text" id="username" name="username" required>
                <button type="submit">Submit</button>
                </form>`
            );
         }
});

//define a route to handle the form submission and set a cookie with the username
app.post('/', (req, res) => {
    //get the username from the request body
    const username = req.body.username;

    //set a cookie named 'username' with the value of the username and options to make it accessible for 1 hour duration
    res.cookie('username', username, {
        maxAge: 1000 * 60 * 60, //1 hour duration cookie
        httpOnly: true, //cookie will be accessible only by the web server
        secure: true //cookie will be sent only over HTTPS
    });

    //send a response to the client
    res.send(`Hello, motherfucker ${username}! Your username has been saved in a cookie.`);
});

//start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});