import { promises as fsPromises } from 'fs';
import { dirname } from 'path';
import superagent from 'superagent';
import mkdirp from 'mkdirp';
import { urlToFilename, getPageLinks } from './utils.mjs';
import { promisify } from 'util';
import { TaskQueue } from './TaskQueue.mjs';

//promisify the mkdirp function for easier use with Promises
const mkdirpPromises = promisify(mkdirp);

//main spider function that downloads a page and its links up to a certain depth
function download(url, filename){
    //log the url being downloaded
    console.log(`Downloading ${url}`);
    //variable to hold the content
    let content;
    //fetch the url using superagent
    return superagent.get(url).then(res => {
        //store the response text in content
        content = res.text;
        //ensure the directory exists
        return mkdirpPromises(dirname(filename));
        //write the content to the specified filename
    }).then(() => fsPromises.writeFile(filename, content))
    //log success message
    .then(() => { 
        console.log(`Downloaded and saved: ${url}`);
        return content;
     });

}
//main spider function that manages downloading and link crawling
function spiderLinks(currentUrl, content, nesting, queue){
    //base case: if nesting is 0, return a resolved Promise
    if(nesting === 0){
        return Promise.resolve();
    }
    //get all links from the content
    const links = getPageLinks(currentUrl, content);
    //create a Promise that resolves when all links have been processed
    const promises = links.map(link => spider(link, nesting - 1, queue));

    //use Promise.all to wait for all link spiders to complete
    return Promise.all(promises);
}
//set to keep track of ongoin spidering operations
const spidering = new Set();
function spiderTask(url, nesting, queue){
    //if the url is already being spidered, return a resolved Promise
    if(spidering.has(url)){
        return Promise.resolve();
    }
    //create a new spider task
    spidering.add(url);
     //convert the url to a filename
    const filename = urlToFilename(url);
    //use the task queue to manage concurrency
    return queue.runTask(() => {
        //check if the file already exists
        return fsPromises.readFile(filename, 'utf8').catch(err => {
            //if the error is not 'file not found', rethrow it 
            if(err.code !== 'ENOENT'){
                throw err;
            }
            //if the file doesn't exist, download it
            return download(url, filename);
        })
    })
    //after ensuring the file exists, read its content and spider its links
    .then(content => spiderLinks(url, content,  nesting, queue));
}
//set the concurrency limit for the task queue
export function spider(url, nesting){
    //set concurrency limit
    const queue = new TaskQueue(concurrency);
    //start the spidering process
    return spiderTask(url, nesting, queue)
}