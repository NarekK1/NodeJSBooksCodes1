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
    //set a cookie with name 'test' and value 'abcde'
    res.cookie('test', 'abcde');
    //send a response to the client indicating that the cookie has been set
    res.send('Hello, World!');
});

//start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});