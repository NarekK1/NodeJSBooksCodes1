//importing express module
import express from "express";
//creating express app
const app = express();
//defining port number
const PORT = 8080;
//definiing a route handler for the default home page
app.get('/', function(req, res){
    //setting status code to 200 OK and sending response to the client
    res.send("OK");

});
//starting the server at port 8080 and printing message
app.listen(PORT, () => console.log(`Movie database accessible at http://localhost:${PORT}`));