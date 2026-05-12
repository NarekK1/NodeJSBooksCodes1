//importing express module
import express from "express";
//creating express app
const app = express();
//defining port number
const PORT = 8080;
//definiing a route handler for the default home page
app.get('/', function(req, res){
    res.redirect('https://www.google.com');

});
//starting the server at port 8080 and printing message
app.listen(PORT, () => console.log(`Movie database accessible at http://localhost:${PORT}`));