import express from 'express';

//create an express app
const app = express();

//define a route with a parameter
app.get('/:num', (req, res) => {
    //get the number from the request parameters
    const num = req.params.num;

    //check if the number is a valid number
    if(/\d+/.test(num)){
        //send a response with the number provided in the URL
        res.send('your num: ' + num);
    }
    //if the number is not a valid number, send a 404 error
    else{
        //if the number is not a valid number, send a 404 error
        res.status(404).send('Not Found');
    }
});

//if the request does not match any of the defined routes, send a 404 error
app.use((req, res) => {
    res.status(404).send('Not Found');
});

//start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

