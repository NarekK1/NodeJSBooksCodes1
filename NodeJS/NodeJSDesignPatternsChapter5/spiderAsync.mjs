import { promises as fsPromises } from 'fs';
import { dirname } from 'path';
import superagent from 'superagent';
import mkdirp from 'mkdirp';
import { urlToFilename, getPageLinks } from './utils.mjs';
import { promisify } from 'util';
import { TaskQueue } from './TaskQueue.mjs';

//promisify the mkdirp function for easier use with Promises
const mkdirpPromises = promisify(mkdirp);

//set concurrency limit ansychronously
async function download(url, filename){
    //log the url being downloaded
    console.log(`Downloading ${url}`);
    //fetch the url using superagent
    const { text: content } = await superagent.get(url);
    //ensure the directory exists
    await mkdirpPromises(dirname(filename));
    //write the content to the specified filename
    await fsPromises.writeFile(filename, content);
    //log suceess message
    console.log(`Downloaded and saved: ${url}`);
    return content

}
//main spider function that manages downloading and link crawling
async function spiderLinks(currentUrl, content, nesting){
    //base case: if nesting is 0, return a resolved Promise
    if(nesting === 0){
        return 
    }
    //get all links from the content
    const links = getPageLinks(currentUrl, content);
    //create a Promise that resolves when all links have been processed
   const promises = links.map(link => spider(link, nesting - 1));
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
export async function spider(url, nesting){
    //set concurrency limit
    const filename = urlToFilename(url);
    //initialize the task queue with desired concurrency
    let content;
    //try to read the file content if it exists
    try{
        content = await fsPromises.readFile(filename, 'utf8');
    }
    //if the file dosen't exist, download it
    catch(err){
        //if the error is not 'file not found', rethrow it
        if(err.code !== 'ENOENT'){
            throw err;
        }
        //download the file and get its content
        content = await download(url, filename);
    }
    //start spidering links from the downloaded content
    return spiderTask(url, content, nesting)
}