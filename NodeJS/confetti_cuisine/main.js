// define port number
const port = 3000;
// import http module and http-status-codes module
const http = require("http");
const httpStatus = require("http-status-codes");
// import router module
const router = require("./router");
// import contentTypes module
const contentTypes = require("./contentTypes");
// import utils module
const utils = require("./utils");
// gets executed when server receives a request
router.get("/", function(req, res){
    // set response header and serve index.html file
    res.writeHead(200, contentTypes.html);
    // serve index.html file
    utils.getFile('views/index.html', res);
});
//listents to courses.html route
router.get("/courses.html", function(req, res){
    // set response header and serve courses.html file
    res.writeHead(200, contentTypes.html);
    // serve courses.html file
    utils.getFile('views/courses.html', res);
});
//gets contact.html route
router.get("/cotact.html", function(req, res){
    // set response header and serve contact.html file
    res.writeHead(200, contentTypes.html);
    // serve contact.html file
    utils.getFile("views/contact.html", res);
});
// listens to POST request on root route
router.post("/", function(req, res){
    // set response header and serve thanks.html file
    res.writeHead(200, contentTypes.html);
    // serve thanks.html file
    utils.getFile("views/thanks.html", res);
});
//gets graph.png 
router.get("/graph.png", function(req, res){
    // set response header and serve graph.png file
    res.writeHead(200, contentTypes.png);
    // serve graph.png file
    utils.getFile("public/images/graph.png", res);
});
router.get("/people.jpg", function(req, res){
    // set response header and serve people.jpg file
    res.writeHead(200, contentTypes.jpg);
    // serve people.jpg file
    utils.getFile("public/images/people.jpg", res);
});
router.get("/product.jpg", function(req, res){
    // set response header and serve product.jpg file
    res.writeHead(200, contentTypes.jpg);
    // serve product.jpg file
    utils.getFile("public/images/product.jpg", res);
});
router.get("/confetti_cuisine.css", function(req, res){
    // set response header and serve confetti_cuisine.css file
    res.writeHead(200,  contentTypes.css);
    utils.getFile("public/css/confetti_cuisine.css", res);
});
router.get("/bootstrap.css", function(req, res){
    // set response header and serve bootstrap.css file
    res.writeHead(200, contentTypes.css);
    utils.getFile("public/css/bootstrap.css", res);
});
router.get("confetti_cuisine.js", function(req, res){
    // set response header and serve confetti_cuisine.js file
    res.writeHead(200, contentTypes.js);
    utils.getFile("public/js/confetti_cuisine.js", res);
});
http.createServer(router.handle).listen(port);
console.log(`The servers is listening on port number: ${port}`);