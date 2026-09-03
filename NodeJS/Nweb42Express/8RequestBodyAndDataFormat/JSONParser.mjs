import express from 'express';

//create an instance of express application
const app = express();

//parse JSON bodies
app.use(express.json());

//simple request logger: place before routes
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
});

