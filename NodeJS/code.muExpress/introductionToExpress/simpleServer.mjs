import express from 'express';

//create object of express application
const app = express();

//define route handler for GET request to the root URL
app.get('/', function(req, res){
    //send response to the client
    res.send('hello world');
});

//start the server and listen on port 3000
app.listen(3000, function(){
    console.log('Example app listening on port 3000!');
});