import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';

//create an express application
const app = express();

//use cookie-parser middleware to parse cookies
app.use(cookieParser());

//use express-session middleware to manage sessions
app.use(session({
    //secret key for signing the session ID cookie
    secret: 'secret-key',
    //do not save session if unmodified
    resave: false,
    //save uninitialized sessions
    saveUninitialized: true,
    //set cookie options, including secure and httpOnly flags max-age of 1 hour
    cookie: { secure: true, httpOnly: true, maxAge: 3600000 }
}));

//define a route to set a session variable
app.get('/login', (req, res) => {
    //set a session variable and a cookie
    req.session.userId = 'user123';
    //set a cookie with a max-age of 1 hour and httpOnly flag which means it cannot be accessed by client-side JavaScript
    res.cookie('auth_token', 'xyz12345', { maxAge: 3600000, httpOnly: true });
    //send a response indicating that the user is logged in
    res.send('Logged in');
});

//listen on port 3000 and log a message to the console when the server is running
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});