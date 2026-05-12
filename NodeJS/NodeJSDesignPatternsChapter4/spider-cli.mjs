import { spider } from './spider.mjs';
import { TaskQueue } from './TaskQueue.mjs';
//get url and nesting from command line arguments
const url = process.argv[2];
//default nesting to 1 if not provided
const nesting = Number.parseInt(process.argv[3], 10) || 1;
//get concurrency from command line argumments of default to 2
const concurrency = Number.parseInt(process.argv[4], 10) || 2;
const spiderQueue = new TaskQueue(concurrency);
//use the spider function from command line
// spider(url, nesting, function(err){
    //handle error
    // if(err){
        // console.error(err);
        // process.exit(1)
    // }
    //log completion message
    // console.log('Download complete');
// })
//use the spider function with task queue
spiderQueue.on('error', console.error);
//log when the queue is empty
spiderQueue.on('empty', () => console.log('Download complete'));
//start spidering the url
spider(url, nesting, spiderQueue)