import express from 'express';
import cookieParser from 'cookie-parser';

//create an instance of express application
const app = express();

//log the HTTP method and URL of the incoming request
app.use(cookieParser());

//post method to set a cookie in the response headers
app.post('/set-cookie', (req, res) => {
    //set a cookie in the response headers with a name, value, and options
    res.cookie('userId', '123456', { maxAge: 900000, httpOnly: true });
    //send a response to the client indicating that the cookie has been set
    res.send('Cookie set');
});

//get method to retrieve the cookie value from the request headers
app.get('/get-cookie', (req, res) => {
    //retrieve the cookie value from the request headers using the cookie-parser middleware
    const userId = req.cookies.userId
    //send a response to the client with the cookie value
    res.send(`Cookie value: ${userId}`);
});

//start the server and listen for incoming requests on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})