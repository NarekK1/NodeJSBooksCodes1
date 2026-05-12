//importing express module
import express from "express";
//creating express app
const app = express();
//defining port number
const PORT = 8080;
//definiing a route handler for the default home page
app.get('/', function(req, res){
    //setting a cookie named 'username' with value 'JhonDoe'
    res.cookie('username', "JhonDoe");
    //sending response to the client
    res.send("Cookie has been set");

});
//starting the server at port 8080 and printing message
app.listen(PORT, () => console.log(`Movie database accessible at http://localhost:${PORT}`));