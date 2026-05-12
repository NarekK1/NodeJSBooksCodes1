import fs from 'fs';
import path from 'path';
import superagent from 'superagent';
import  mkdirp  from 'mkdirp'
import { urlToFilename, getPageLinks } from './utils.mjs';
//helper function to save file
function saveFile(filename, contents, cb){
    //ensure directory exists
    mkdirp(path.dirname(filename), function(err){
        //handle directory creation error
        if(err){
            return cb(err);
        }
        //write file to disk
        fs.writeFile(filename, contents, cb);
    })
}
//downloading function
function download(url, filename, cb){
    //log downloading message
    console.log(`Downloading ${url}`);
    //make http request
    superagent.get(url).end((err, res) => {
        //handle http request error
        if(err){
            return cb(err);
        }
        //save file to disk
        saveFile(filename, res.text, err => {
            //handle file saving error
            if(err){
                return cb(err);
            }
            //save successful return contents
            // saveFile(filename, res.text, (err){
                //handle file saving error
                // if(err){
                    // return cb(err);
                // }
                //log success message
                console.log(`Downloaded and saved: ${url}`);
                //return file contents to callback
                cb(null, res.text);
            })
        })
// })
}
//helper function to get links from a page
function spiderLinks(currenUrl, body, nesting, queue){
    //base case for recusion
    if(nesting === 0){
        // return process.nextTick(cb);
        return
    }
    //get the links from the page
    const links = getPageLinks(currenUrl, body);
    //if no links found, return
    if(links.length === 0){
        // return process.nextTick(cb);
        return
    }
    //keep track of completed links
    // let completed  = 0;
    //flag to track errors
    // let hasErrors = false;
    //callback for each link
    // function done(err){
        //handle error
        // if(err){
            //set error flag
            // hasErrors = true;
            // return cb(err);
        // }
        //incriment completed counter
        // if(++completed === links.length && !hasErrors){
            // return cb()
        // }
    // }
    //spider each link
    // links.forEach(link => spider(link, nesting - 1, done));
    //alternative using for loop
       links.forEach(link => spider(link, nesting - 1, queue));
    //process each link one by one
    // function iterate(index){
        //base case for iteration
        // if(index === links.length){
            // return cb();
        // }
        //spider the link
        // spider(links[index], nesting - 1, function(err){
            //handle spidering error
            // if(err){
                // return cb(err);
            // }
            //process the next link
            // iterate(index + 1);
        // })
    // }
    //start iterating over links
    // iterate(0);
}
//helper
function spiderTask(url, nesting, queue, cb){
    //convert url to filename
    const filename = urlToFilename(url);
    //check if file already exists
    fs.readFile(filename, 'utf8', (err, fileContent) =>{
        //handle file read error
        if(err){
            //if error is not file not found, return error to callback
            if(err.code !== 'ENOENT'){
            return cb(err);
            }
            //file does not exist, download if
            return download(url, filename, (err, requestContent) => {
                //handle downaload error
                if(err){
                    return cb(err);
                }
                //process the links in the downloaded content
            spiderLinks(url, requestContent, nesting, queue);
            })
             
        }
        //file exists process the links in the file content
        spiderLinks(url, fileContent, nesting, queue);
        return cb();
    })
}
//set to keep track of spidering urls
const spidering = new Set();
//exports the function spidder
// export function spider(url, cb){
    //convert url to filename
    // const filename = urlToFilename(url);
    //check if file already exists
    // fs.readFile(filename, 'utf8', function(err, fileContent){
        //hanlde file read error
        // if(err){
            //if error is not file not found,return error to callback
            // if(err.code !== 'ENOENT'){
                // return cb(err);
            // }
            //file does not exist, download it
            // return download(url, filename, function(err, requestContent){
                //handle download error
                // if(err){
                    // return cb(err);
                // }
                //process the links in the downloaded content
                // spiderLinks(url, requestContent, cb);
            // })
        // }
        //file exists, process the links in the file content
        // spiderLinks(url, fileContent, nesting, cb);
    // })
        //if file does not exist, download it
        // if(!err && err.code !== "ENOENT"){
            
            //file does not exist download it
            // console.log(`Downloading ${url} into ${filename}`);
            //make http request
            // superagent.get(url).end(function(err, res){
                //handle http request error
                // if(err){
                    //return error to callback
                    // cb(err);
                // }
                //create directory if not exists
                // else{
                    //make sure directory exists
                    // mkdirp(path.dirname(filename), function(err){
                        //handle directory creation error
                        // if(err){
                            //return error to callback
                            // cb(err);
                        // }
                        //write filex to disk
                        // else{
                            // fs.writeFile(filename, res.text, function(err){
                                //handle file writing error
                                // if(err){
                                    //return error to callback
                                    // cb(err);
                                // }
                                //return success to callback
                                // else{
                                    //return filename and a flag indicating download
                                    // cb(null, filename, true);
                                // }
                            // });
                        // }
                    // });
                // }
            // })
        // }
        //file exists,return filename
        // else{
            //file exists return filename and a flag indicating no download
            // cb(null, filename, false);
        // }
    
// }
//exported spider function
export function spider(url, nesting, queue){
    //check if url is already being spidered
    if(spidering.has(url)){
        return
    }
    //add url to spidering set
    spidering.add(url);
    //add spider task to the queue
    queue.pushTask((done) => spiderTask(url, nesting, queue, done));
}