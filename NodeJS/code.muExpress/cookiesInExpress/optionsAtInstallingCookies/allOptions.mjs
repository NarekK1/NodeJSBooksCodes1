import express from 'express';
import cookieParser from 'cookie-parser';

//create an instance of express application
const app = express();

//set a secret key to sign the cookies
const secret = 'mySecretKey';

//use cookie-parser middleware with a secret key to sign the cookies
app.use(cookieParser(secret));

//define a route to set a cookie with a name and value
app.get('/', (req, res) => {
    //set a cookie named 'test' with value 'abcde' with options
    res.cookie('test', 'abcde', {
        domain: 'localhost', //cookie will be accessible only for localhost domain
        path: '/', //cookie will be accessible for all routes
        maxAge: 1000 * 60 * 60, //1 hour duration cookie
        secure: true, //cookie will be sent only over HTTPS
        httpOnly: true, //cookie will be accessible only through HTTP(S) requests
    });
    //send a response to the client
    res.send('Cookie has been set with options!');
});

//start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})