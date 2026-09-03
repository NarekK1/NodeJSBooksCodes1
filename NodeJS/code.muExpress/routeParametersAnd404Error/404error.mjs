import express from 'express';

//create an express app
const app = express();

//define a route with a parameter
app.get('/test/:num/', (req, res) => {
    //get the number from the request parameters
    const num = req.params.num;

    //check if the number is between 1 and 9
    if(num >= 1 && num <= 9){
        //send a response with the number provided in the URL
        res.send('your num: ' + num);
    }
    //check if the number is a valid number but not in the range
    else if(/\d+/.test(num)){
        //send a response indicating the number is not valid
        res.send('your num: ' + num + ' is not a valid number');
    }
    //if the number is not a valid number, send a 404 error
    else{
        res.status(404).send('not found');
    }
});

//start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
})