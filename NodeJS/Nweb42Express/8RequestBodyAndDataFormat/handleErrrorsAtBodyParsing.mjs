import express from 'express';

//create an instance of express application
const app = express();

//parse JSON bodies
app.use(express.json());

//simple request logger: place before routes
app.use((err, req, res, next) => {
    //check if the error is a SyntaxError
    if(err instanceof SyntaxError){
        //send a response with status code 400 and an error message indicating that the JSON format is invalid
        return res.status(400).send({ error: 'Invalid JSON format' });
    }
    //if the error is not a SyntaxError, pass it to the next error handler
    next(err);
});

//post route to handle incoming JSON data
app.post('/data', (req, res) => {
    //data is the parsed JSON body of the incoming request
    const data = req.body;
    //log the parsed data to the console
    console.log(data);
    //send a response back to the client indicating that the data was received successfully
    res.send('Data received');
});

//listener to start the server and listen for incoming requests on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})