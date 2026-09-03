import express from 'express';
import cookieParser from 'cookie-parser';

//create express app
const app = express();

//set secret key for signing cookies
const secretKey = 'mySecretKey';

//use cookie parser middleware and pass the secret key to it
app.use(cookieParser(secretKey));

//route to set a delete cookie
app.get('/', (req, res) => {
    //clear the cookie named 'test' by setting its value 
    res.clearCookie('test');
    //send response to the client
    res.send('Hello, World!');
});

//start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});