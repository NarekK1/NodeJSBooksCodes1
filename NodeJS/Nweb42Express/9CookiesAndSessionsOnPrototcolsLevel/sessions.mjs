import express from 'express';
import session from 'express-session';

//create an express application
const app = express();

//configure session middleware
app.use(session({
    //set a secret key for signing the session ID cookie
    secret: 'secret-key',
    //do not resave the session if it hasn't been modified
    resave: false,
    //save uninitialized sessions
    saveUninitialized: true,
    //set the cookie options, including secure flag
    cookie: { secure: false }
}));

//define a route to set a session variable
app.get('/set-session', (req, res) => {
    //set a session variable
    req.session.userId = '123456';
    //send a response indicating that the session has been set
    res.send('Session set');
});

//define a route to get the session variable
app.get('/get-session', (req, res) => {
    //get the session variable
    const userId = req.session.userId;
    //send a response with the session variable
    res.send(`User ID from session: ${userId}`);
});

//start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});