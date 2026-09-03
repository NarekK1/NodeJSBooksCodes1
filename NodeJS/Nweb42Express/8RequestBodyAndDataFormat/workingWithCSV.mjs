import csv from 'csv-parser';
import express from 'express';
import { Readable } from 'stream';

//create an instance of express application
const app = express();

//use express.raw() and express.text() middleware to parse incoming CSV requests
app.post('/csv', express.raw(), express.text({ type: ['text/csv', 'application/csv', 'text/plain'] }), (req, res) => {
    //array to hold the parsed CSV data
    const results = [];
    //use Readable.from() to create a readable stream from the request body and pipe it to the csv-parser
    Readable.from([req.body])
        .pipe(csv())
        //push each parsed row of CSV data into the results array
        .on('data', data => results.push(data))
        //handle any errors that occur during parsing and send a 400 Bad Request response
        .on('error', () => { 
            //send a 400 Bad Request response if there is an error parsing the CSV and send an error message in the response body
            res.status(400).send('Error parsing CSV');
        })
        //when the parsing is complete, log the results to the console and send them back in the response as JSON
        .on('end', () => {
            //log the parsed CSV data to the console and send it back in the response as JSON
            console.log(results);
            res.json(results);
        });
});

//start the server and listen on port 3000, logging a message to the console when the server is running
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})