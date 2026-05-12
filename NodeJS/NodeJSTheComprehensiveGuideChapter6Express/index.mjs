//importing express module
import express from "express";
//creating express app
const app = express();
const PORT = 8080;
//definiing a route handler for the default home page
app.get('/', function(req, res){
    //sending response and printing message
    res.send("My first express aplication");
});
//starting the server at port 8080 and printing message
app.listen(PORT, () => console.log(`Movie database accessible at http://localhost:8080`));