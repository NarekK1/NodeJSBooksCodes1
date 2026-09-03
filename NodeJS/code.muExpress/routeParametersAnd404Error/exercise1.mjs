//check if the date provided in the URL is in the correct format and is a valid date.
import express from 'express';

//create an express app
const app = express();

//define a route with a parameter
app.get('/date/:date', (req, res) => {
    //get the date from the request parameters
    const date = req.params.date;

    //check if the date is in the format YYYY-MM-DD
    const regex = /^\d{4}-\d{2}-\d{2}$/;

    //check if the date is in the correct format
    if(!regex.test(date)){
        //if the date is not in the correct format, send a 404 error
        return res.status(404).send('not found');
    }

    //check if the date is a valid date
    const [year, month, day] = date.split('-').map(Number);

    //check if the month and day are valid
    if(month < 1 || month > 12 || day < 1 || day > 31){
        //if the month or day is not valid, send a 404 error
        return res.status(404).send('Not Found');
    }

    //send a response with the date provided in the URL
    res.send(`Your data is: ${year}-${month}-${day}`);
});

//start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});