//install cookie for concrete site folder check if the cookie is not readable in other addresses

import express from 'express';
import cookieParser from 'cookie-parser';

//create an instance of express application
const app = express();

//set a secret key to sign the cookies
const secret = 'mySecretKey';

//use cookie-parser middleware with a secret key to sign the cookies
app.use(cookieParser(secret));

//define a route to set a cookie with a name and value
app.get('/site/about.html', (req, res) => {
    //set a cookie named 'test' with value 'abcde' and options to make it accessible only for the specific site folder
    res.cookie('test', 'abcde', {
        path: './site', //cookie will be accessible only for the /site folder
        maxAge: 1000 * 60 * 60, //1 hour duration cookie
    });
    //send a response to the client
    res.send('Cookie has been set for the /site folder!');
});

app.get('/site/contact.html', (req, res) => {
    //check if the cookie is accessible in the root route
    if(req.cookies.test){
        //send a respone to the client if the cookie is accessible
        res.send('Cookie is accessible: ' + req.cookies.test);
    }
    else{
        //send a response to the client if the cookie is not accessible
        res.send('Cookie is not accessible in the root route!');
    }
});
//define a route to check if the cookie is accessible
app.get('/', (req, res) => {
    //check if the cookie is accessible in the root route
    if(req.cookies.test){
        //send a respone to the client if the cookie is accessible
        res.send('Cookie is accessible: ' + req.cookies.test);
    }
    else{
        //send a response to the client if the cookie is not accessible
        res.send('Cookie is not accessible in the root route!');
    }
});

//start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});