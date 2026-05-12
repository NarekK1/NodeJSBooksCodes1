import { createServer } from 'http';
import { fork } from 'child_process';

//create a server
const server = createServer();

//handle requests
server.on('request', (req, res) => {
    //if the request is for /compute, perform the long computation in a child process
    if(req.url === '/compute'){
        //fork a child process to perform the long computation
        const compute = fork('./compute.mjs');
        //send a message to the child process to start the computation
        compute.send('start');
        //lisen for messages from the child process and return the result to the client
        compute.on('message', sum => {
            //return the result and end the response
            res.end(`Sum: ${sum}`);
        });
    }
    //for any other request, return a simple response
    else{
        //return a simple response Ok and end the response
        res.end('Ok');
    }
});

//start the server
server.listen(3000, () => {
    //log the message that the server is running
    console.log('Server is running...');
});