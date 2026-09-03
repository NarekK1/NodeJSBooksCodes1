import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//get the currrent file name and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//join the directory name with the file name to get the full path of the file to be tracked
const p = path.join(__dirname, 'file1.txt');

//watch the file for changes
const watcher = fs.watch(p);
//log that tracking has started
console.log('Tracking started');

//after 5 seconds, stop tracking the file
setTimeout(function(){
    //close the watcher to stop tracking the file
    watcher.close();
}, 5000);

//log that tracking has stopped when the watcher is closed
watcher.on('close', function(){
    //log that tracking has stopped
    console.log('Tracking deleted');
});

//log the event and file name when a change is detected
watcher.on('change', (e, fileName) => {
    //log the event and file name
    console.log(`event: ${e}`);
    console.log(`file: ${fileName}`);
});