import { createServer } from 'http';
import Chance from 'chance';

//an HTTP server that serves random data
const chance = new Chance();
//create the server
const server = createServer((req, res) => {
    //set response headers
    res.writeHead(200, {'Content-Type': 'text/plain'});
    //write random data to the response
    while(chance.bool({ likelihood: 95 })){
        res.write(`${chance.string()}\n`);
    }
    //end the response
    res.end('\n\n');
    //log when all data has been sen
    res.on('finish', () => console.log('All data sent'));
});
//start the server and listen on port 8080 and log the URL
server.listen(8080, () => console.log('Listening on http://localhost:8080'));