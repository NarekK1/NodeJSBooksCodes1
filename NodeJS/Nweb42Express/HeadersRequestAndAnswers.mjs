import express from "express";
import cookieParser from 'cookie-parser';

//create an instance of express application
const app = express();

//log the HTTP method and URL of the incoming request
app.use((req, res, next) => {
    //log the HTTP method and URL of the incoming request
    console.log(`${req.method} ${req.url}`);
    //call the next middleware function in the stack
    next();
});

//create a middleware cookie parser to parse cookies from the request headers
app.use(cookieParser());

//get method to retrieve a resource to demonstrate the use of request headers
app.get('/user', (req, res) => {
    //get the value of the User-Agent header from the request headers
    const userAgent = req.get('User-Agent');
    //log the value of the User-Agent header in the console
    console.log(userAgent);
    //send a response indicating that the User-Agent header has been logged in the console
    res.send('User-Agent header logged in the console');
});

//get method to retrieve a resource to demonstrate the use of response headers
app.get('/header-check', (req, res) => {
    //check if a custom header exists in the request headers
    if('x-custom-header' in req.headers){
        //send a response indicating that the custom header exists in the request headers
        res.send('Header exists');
    }
    //check if a custom header does not exist in the request headers
    else{
        //send a response indicating that the custom header does not exist in the request headers
        res.send('Header does not exist');
    }
});

//get method to retrieve a resource to demonstrate the use of response headers
app.get('/set-header', (req, res) => {
    //set the Content-Type header to application/json in the response headers
    res.set('Content-Type', 'application/json');
    //set multiple headers in the response headers
    res.set({ 'X-Custom-Header': 'Hello', 'Cache-Control': 'no-store' });
    //send a response indicating that the headers have been set successfully
    res.send('Headers set successfully');
});

//get method for a non-existing resource to demonstrate the use of 404 status code
app.get('/not-found', (req, res) => {
    //send a response with a 404 status code indicating that the resource was not found
    res.status(404).send('Resource not found');
});

//get method for cookies to demonstrate the use of cookies in the response headers
app.get('/append-header', (req, res) => {
    //append multiple Set-Cookie headers in the response headers
    res.append('Set-Cookie', 'user=12345');
    //append another Set-Cookie header in the response headers
    res.append('Set-Cookie', 'theme=dark');
    //send a response indicating that the cookies have been appended successfully
    res.send('Cookies appended successfully');
});

//cache method to demonstrate the use of Cache-Control header in the response headers
app.get('/cache', (req, res) => {
    //set the Cache-Control header to public and max-age of 3600 seconds (1 hour) in the response headers
    res.set('Cache-Control', 'public, max-age=3600');
    //send a response indicating that the data can be cached for 1 hour
    res.send('Data can be cached for 1 hour');
});

//get method to demonstrate the use of ETag header in the response headers
app.get('/etag', (req, res) => {
    //set the ETag header to a specific value in the response headers
    res.set('ETag', '12345');
    //send a response indicating that the ETag header has been set successfully
    res.send('ETag set successfully');
});

//method to give a access control to the response headers to allow cross-origin requests
app.use((req, res, next) => {
    //set the Last-Modified header to the current dat
    res.set('Access-Control-Allow-Origin', '*');
    //set the Access-Control-Allow-Methods header to allow GET and POST methods in the response headers
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    //next middleware function in the stack
    next();
});

//method for cookie handling to demonstrate the use of cookies in the response headers
app.get('/set-cookie', (req, res) => {
    //set a cookie named 'user' with the value 'JohnDoe' and a max age of 900000 milliseconds (15 minutes) in the response headers
    res.cookie('user', 'JohnDoe', { maxAge: 900000, httpOnly: true });
    //send a response indicating that the cookie has been set successfully
    res.send('Cookie set successfully');
});

//get method to read the cookie from the request headers
app.get('/read-cookie', (req, res) => {
    //get the value of the 'user' cookie from the request headers
    const user = req.cookies.user;
    //send a response indicating the value of the 'user' cookie
    res.send(`Hello, ${user}`);
});

//listener to start the server and listen for incoming requests on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});