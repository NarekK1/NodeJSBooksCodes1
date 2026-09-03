import express from 'express';
import xml2js from 'xml2js';

//create an instance of express application
const app = express();

//use express.text() middleware to parse incoming XML requests
app.post('/xml', express.text({ type: ['application/xml', 'text/xml', 'application/*+xml'] }), (req, res) => {
    //parse the XML data from the request body
    xml2js.parseString(req.body, (err, result) => {
        //set the response header to indicate that the response is in XML format
        res.setHeader('Content-Type', 'application/xml');
        //handle any errors that occur during parsing
        if(err){
            //send a 400 Bad Request response with an error message in XML format
            return res.status(400).send('<?xml version="1.0" encoding="UTF-8"?><response><error>Error parsing XML</error></response>');
        }
        //log the parsed result to the console
        console.log(result);
        //send a success response in XML format
        res.send('<?xml version="1.0" encoding="UTF-8"?><response><message>XML parsed successfully</message></response>');
    })
});

//start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})