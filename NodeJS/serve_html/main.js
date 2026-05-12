// port number
const port = 3000;
// required modules http
const http = require('http');
// http status codes import
const httpStatus = require("http-status-codes");
const router = require("./router")
// file system module import
const fs = require("fs");
// route map association
// const routeMap = {
//     "/": "views/index.html"
// };
// define content types
const plainTextContentType = {
    "Content-Type": "text/plian"
};
// define content type for HTML
const htmlContentType = {
    "Content-Type": "text/html"
};
// custom file read function
const customReadFile = function(file, res){
    // read file from file system
    fs.readFile(`./${file}`, function(errors, data){
        // handle errors
        if(errors){
            console.log("Error reading thel file...");
            
        }
        // send file data as response
        res.end(data);
    });
};
// create server
// http.createServer(function(req, res){
//     // set header content type
//     res.writeHead(200, {"Content-Type": "text/html"});
//     // route handling
//     if(routeMap[req.url]){
//         // read file and send response
//         fs.readFile(routeMap[req.url], function(error, data){
//             res.write(data);
//             res.end
//         })
//     }
//     // handle 404 - file not found
//     else{
//         res.end("<h1>Sorry, not found.</h1>");
//     }

// })
// server listening on port
// .listen(port);
// define routes
router.get("/", function(req, res){
    // send response for root route
    res.writeHead(200, plainTextContentType);
    // end response
    res.end("INDEX");
});
// define route for index.html
router.get("index.html", function(req, res){
    // set header content type
    res.writeHead(200, htmlContentType);
    // read and send index.html file
    customReadFile("views/index.html", res);
});
// define route for about.html
router.post("/", function(req, res){
    // send response for root route
    res.writeHead(200, plainTextContentType);
    // end response
    res.end("POSTED");
})
// start server
http.createServer(router.handle).listen(port);
// console.log(`The server has started and is listening on port number: ${port}`);
console.log(`The server is listening on port number: ${port}`);