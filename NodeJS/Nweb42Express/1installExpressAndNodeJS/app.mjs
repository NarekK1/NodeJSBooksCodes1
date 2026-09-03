import express from "express";

//create an instance of express
const app = express();

//define a route for the root URL
app.get('/', (req, res) => {
    //send a response to the client
    res.send('Hello, Express!');
});

//start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

//export the app instance 
export default app;