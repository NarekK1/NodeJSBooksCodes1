import express from 'express';

//create an instance of express application
const app = express();

//urlencoded parser middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

//simple request logger: place before routes
app.post('/form', (req, res) => {
    //log the HTTP method and URL of the incoming request
    const formData = req.body;
    //log the form data received in the request body
    console.log(formData);
    //log the HTTP method and URL of the incoming request
    res.send('Form data sent');
});


//listener to start the server and listen for incoming requests on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

