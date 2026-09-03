import express from 'express';

//create an instance of express application
const app = express();

//get method to retrieve a list of users
app.get('/', (req, res) => {
    //send a JSON response with a list of users
    res.json({ users: ['Alice', 'Bob', 'Charlie'] });
});

//post method to create a new user
app.post('/users', (req, res) => {
    //parse the request body to get the new user data
    const user = req.body;

    //send a JSON response indicating that a new user has been created
    res.status(201).json({ message: 'User created', user });
});

//put method to update an existing user fully
app.put('/users/:id', (req, res) => {
    //parse the request parameters to get the user ID and the request body to get the updated user data
    const userId = req.params.id;
    const updatedUser = req.body;

    //send a JSON response indicating that the user has been updated
    res.json({ message: "User updated", updatedUser });
});

//patch method to update an existing user partially
app.patch('/users/:id', (req, res) => {
    //parse the request parameters to get the user ID
    const userId = req.params.id;
    //parse the request body to get the updated fields
    const updatedFields = req.body;

    //send a JSON response indicating that the user has been partially updated
    res.json({ message: 'User partially updated', updatedFields });
});

//delete method to delete an existing user
app.delete('/users/:id', (req, res) => {
    //parse the request parameters to get the user ID
    const userId = req.params.id;
    
    //send a JSON response indicating that the user has been deleted
    res.json({ message: 'User deleted' });
});

//options method to handle preflight requests for CORS
app.options('/users', (req, res) => {
    //set the allowed methods for the /users endpoint
    res.setHeader('Allow', 'GET, POST, OPTIONS');
});

//head method to retrieve the headers for the /users endpoint
app.head('/users', (req, res) => {
    //set the Content-Type header to application/json
    res.setHeader('Content-Type', 'application/json');

    //set the Content-Length header to the length of the response body and send a 200 OK status code with no response body then end the response
    res.status(200).end();
});

//middleware to log the request method and URL for each incoming request
app.use((req, res, end) => {
    //log the request method and URL to the console
    console.log(`${req.method} ${req.url}`);
    //call the next middleware function in the stack
    end();
});

//start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})