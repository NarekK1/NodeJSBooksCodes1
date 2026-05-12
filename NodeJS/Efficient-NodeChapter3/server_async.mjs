import http from 'http';

//simulate a slow operation asynchronous task
const slowOperation = (cb) => {
    //simulate a slow operation using setTimeout
    setTimeout(() => cb(), 15000);
}

//counter to track the number of requests
let counter = 0;

//create a server
const server = http.createServer((req, res) => {
    //increment the counter
    counter++;
    //simulate a slow response for the first request
    if(counter === 1){
        //simulate a slow operation
        slowOperation();
        //send a response and end the request
        res.end('Slow reponse');
    }
    //for subsequent requests, send a normal response
    else{
        //send a response and end the request
        res.end('Normal response')
    }
});

//start the server on port 3000 
server.listen(3000, () => {
    //log a message to the console when the server is running
    console.log('Server is running...');
})