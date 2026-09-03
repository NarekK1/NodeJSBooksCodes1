import express from 'express';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';

//create an instance of express application
const app = express();

//set a secret key to sign the cookies
const secret = 'qwerty';

//use cookie-parser middleware with a secret key to sign the cookies
app.use(cookieParser(secret));

//use express-session middleware with a secret key to sign the cookies
app.use(expressSession({ secret: secret }));

//define a route to set a cookie with a name and value
app.get('/', (req, res) => {
    //send a response to the client
    res.send('Hello, World!');
});

//start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});