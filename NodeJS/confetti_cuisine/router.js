// importing the 'http-status-codes' module to use standard HTTP status codes
const httpStatus = require("http-status-codes");
// importing the 'contentTypes' module to access predefined content types
const contentTypes = require("./contentTypes");
// importing the 'utils' module to utilize utility functions
const utils = require("./utils");
// defining an object to hold route handlers for different HTTP methods
const routes = {
    "GET": {},
    "POST": {}
};
// exporting functions to handle routing
exports.handle = function(req, res){
    try{
        routes[req.method][req.url](req, res);
    }
    catch(e){
        res.writeHead(200, contentTypes.html);
        utils.getFile("views/error.html", res);
    }
};
// function to register GET route handlers
exports.get = function(url, action){
    routes["GET"][url] = action;
}
// function to register POST route handlers
exports.post = function(url, action){
    routes["POST"][url] = action
}