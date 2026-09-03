import express from 'express';
import cookieParser from 'cookie-parser';

//create an instance of express application
const app = express();

//create a secret key to sign the cookies
const secret = 'qwerty';

//use the cookie-parser middleware with the secret key to sign the cookies
app.use(cookieParser(secret));

//define a route to get simple request
app.get('/', (req, res) => {
    //send a simple response to the client
    res.send('Hello, World!');
});

//start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});