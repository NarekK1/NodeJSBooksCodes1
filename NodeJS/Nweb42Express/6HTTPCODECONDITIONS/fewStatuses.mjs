import express from "express";

//create an instance of express application
const app = express();
// parse JSON bodies
app.use(express.json());

// simple request logger: place before routes
app.use((req, res, next) => {
    //log the HTTP method and URL of the incoming request
    console.log(`${req.method} ${req.url}`);
    //call the next middleware function in the stack
    next();
});

//get method to retrieve a resource
app.get('/example', (req, res) => {
    //send a JSON response with a message indicating that the request was successful
    res.status(200).send('Request was successful!');
});

//get method to retrieve a resource with a 404 status code
app.get('/notfound', (req, res) => {
    //send a JSON response with a message indicating that the resource was not found
    res.status(404).send('Resource not found');
});

//post method to create a new resource with a 201 status code
app.post('/create', (req, res) => {
    //parse the request body to get the new resource data
    if(req.body.name){
        //send a JSON response indicating that the resource has been created successfully
        res.status(201).json({ message: 'Resource created successfully!' });
    }
    //send a JSON response indicating that there was an error in the request 400 status code which means bad request
    else{
        res.status(400).json({ error: 'Error in request' });
    }
});

//listener to start the server and listen for incoming requests on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});