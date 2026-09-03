import express from 'express';

//create an instance of express
const app = express();

//define routes
app.get('/1/', function(req, res){
    //send a response page1
    res.send('page1');
});

//define a route for /2/
app.get('/2/', function(req, res){
    //send a response page2
    res.send('page2');
});

//handle 404 error for undefined routes
app.use(function(req, res){
    //sent 404 status code and send a response message
    res.status(404).send('not found');
});

//start the server and listen on port 3000
app.listen(3000, function(){
    console.log('server started');
});