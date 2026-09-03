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

//define a route to set login session variable
app.get('/', (req, res) => {
    //set a session variable named 'test' with value 'abcde'
    req.session.test = 'abcde';
    //send a response to the client
    res.send('Hello, World!');
});

//start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});