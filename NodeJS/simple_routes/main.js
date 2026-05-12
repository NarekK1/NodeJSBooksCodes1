// page content for different routes
const routeResponseMap = {
    "/info": "<h1>Info Page</h1>",
    "/contact": "<h1>Contact Us</h1>",
    "/about": "<h1>Learn More About Us.</h1>",
    "/hello": "<h1>Say hello be emailing us here</h1> <a href='/hello'>narek.kirakosyan1983@gmail.com</a>",
    "/error": "<h1>Sorry the page you are looking for is not here.</h1>"
};
const port = 3000;
const http = require("http");
const httpStatus = require("http-status-codes");
const app = http.createServer(function(req, res){
    res.writeHead(200, { "Content-Type": "text/html"});
    if(routeResponseMap[req.url]){
        res.end(routeResponseMap[req.url]);
    }
    else if(routeResponseMap[req.url["/error"]]){
        res.writeHead(404, {"Content-Type": "text/html"});
        res.end();
    }
    else{
        res.end("<h1>Welcome!</h1>");
    }
});
app.listen(port);
console.log(`The servers has started and is listening on port number: ${port}`);