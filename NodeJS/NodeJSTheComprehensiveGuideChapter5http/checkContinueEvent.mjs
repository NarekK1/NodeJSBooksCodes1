//chi ashxatym vonc petqa
// import the http module
import http from 'http';
// import validUrl from 'valid-url';
import url from 'url'
// import isUrl function from url module
// import { isUrl } from 'check-valid-url';
import validUrl from 'valid-url';
//define the port number
const port = 3000;

//define the url
const urlPort = `http://localhost:${port}`;
//check if the url is valid
// const isValidUrl = isUrl(url);
//create the server
const server = http.createServer(function(req, res){
    server.on('checkContinue', function(req, res){
    console.log('checkContinue event emitted');
    res.writeContinue();
    let randomNum = Math.floor(Math.random() * 100);
    if(randomNum <= 20){
        res.writeHead(100, {'Content-Type': 'application/json'});
        console.log('100 Continue');
        res.end();
    }
    else{
        res.writeHead(400, {'Content-Type': 'application/json'});
        setTimeout(() => {
            server.close(() => console.log('Closing server due to 400 Bad Request'));
        }, 3000);
    }
    // server.close(()=> console.log('server closed'));
})
    // set the response header
    res.writeHead(200, {'content-type': 'application/json'});
    // end the response
    res.end();
})
//make the server listen on the defined port
.listen(port, function(){
    //log the listening message
     console.log(`Listening to http://localhost:${port}`);
});
//make a GET request to the server
// http.get(`http://localhost:${port}/`, function(req, res){
    //listen for the 'checkContinue' event
    
// });