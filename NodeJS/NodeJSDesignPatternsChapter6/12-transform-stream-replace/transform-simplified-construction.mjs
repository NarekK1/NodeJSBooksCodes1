import { Transform } from 'stream';

//replace 'Word' with 'Node.js' in the input stream
const searchStr = 'World';
//string to replace with
const replaceStr = 'Node.js';
//tail to handle split strings across chunks
let tail = '';

//create a transform stream instance
const replaceStream = new Transform({
    //enable utf8 encoding by default
    defaultEncoding: 'utf8',
    //override transform method to handle chunk processing
    transform(chunk, encoding, cb){
        //calculate length of tail to retain for next chunk
        const pieces = (tail + chunk).split(searchStr);
        //retain the last part of the split string as tail
        const lastPiece = pieces[pieces.length - 1];
        //the length of the search string minus one
        const tailLen = searchStr.length - 1;
        //calculate length of tail to retain
        tail = lastPiece.slice(-tailLen);
        //join all pieces except the last one with the replace string
        pieces[pieces.length - 1] = lastPiece.slice(0, -tailLen);
        //push the transformed chunk to the readable side
        this.push(pieces.join(replaceStr));
        //call the callback to signal completion
        cb();
    },
    //override flush method to handle any remaining tail data
    flush(cb){
        //push any remaining tail data
        this.push(tail);
        //call the callback to signal completion
        cb()
    }
})
//listen for data events to output transformed chunks
replaceStream.on('data', chunk => console.log(chunk.toString()));

//write data to the  transform stream
replaceStream.write('Hello W');
//write more data to the transform stream
replaceStream.write('orld!');
//end the writable side of the transform stream
replaceStream.end();