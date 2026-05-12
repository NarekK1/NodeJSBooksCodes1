// importing the 'fs' module to work with the file system
const fs = require("fs");
// importing the 'http-status-codes' module to use standard HTTP status codes
const httpStatus = require("http-status-codes");
// importing the 'contentTypes' module to access predefined content types
const contentTypes = require("./contentTypes");
module.exports = {
    getFile: function(file, res){
        fs.readFile(`./${file}`, function(error, data){
            if(error){
                res.writeHead(500,   contentTypes.html);
                res.end("There was an erro saving content!")
            }
          res.end(data);
        });
    }
};