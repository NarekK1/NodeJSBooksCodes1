import express from 'express';

//create an instance of the express application
const app = express();

//html string to be sent as a response
const str = `<div>
    <p>Text1</p>
    <p>Text2</p>
    <p>Text3</p>
</div>`;

//define a route that responds with a simple HTML page
app.get('/test', function(req, res){
    //send the HTML string as the response
    res.send(str);
});

//start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});