import { spider } from "./spider.mjs";
//get the url and nesting depth from command line argyuments
const url = process.argv[2];
//default nesting depth to 1 if not provided
const nesting = Number.parseInt(process.argv[3], 10) || 1;
//initiate the spidering process
spider(url, nesting).then(() => console.log('Download complete'))
//catch and log any errors
.catch(err => console.error(err));