const httpStatus = require("http-status-codes");
// define content type for HTML
const htmlContentType = {
    "Content-Type": "text/html"
};
// route definitions
const routes = {
    "GET": {
        "/info": function(req, res){
            res.writeHead(200, {"Content-Type": "text/plain"});
            res.end("Welcome to the Info Page!");
        }
    },
    'POST':{}
};
// handle incoming requests
exports.handle = function(req, res){
    //check if route exists and call associated action
    try{
        if(routes[req.method][req.url]){
            routes[req.method][req.url](req, res);
        }
        else{
            res.writeHead(404, htmlContentType);
            res.end("<h1>No such file exists</h1>");
        }
    }
    //catch errors
      catch(ex){
         console.log("error: " + ex);   
        }
};
// define GET and POST route methods
exports.get = function(url, action){
    // associate url with action in GET routes
    routes["GET"][url] = action;
};
// define POST route method
exports.post = function(url, action){
    // associate url with action in POST routes
    routes["POST"][url] = action;
};