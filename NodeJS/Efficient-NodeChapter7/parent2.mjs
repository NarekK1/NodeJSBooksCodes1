import { createServer } from 'http';

//simulate a long computation
const longComputation = () => {
    let sum = 0;
    //simulate a long computation
    for(let i = 0; i < 1e9; i++){
        //simulate some work
        sum += i;
    }
    //return the result
    return sum;
};

//create a server
const server = createServer();

//handle requests
server.on('request', (req, res) => {
    //if the request is for /compute, perform the long computation
    if(req.url === '/compute'){
        //perform the long computation
        const sum = longComputation();
        //return the result
        return res.end(`Sum: ${sum}`);
    }
    //for any other request, return a simple response
    else{
        //return a simple response Ok
        res.end('Ok');
    }
});

//start the server
server.listen(3000, () => {
    console.log('Server is running...');
})