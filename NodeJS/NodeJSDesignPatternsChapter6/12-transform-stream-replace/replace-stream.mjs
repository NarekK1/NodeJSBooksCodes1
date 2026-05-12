//Transform stream that replaces occurences of a string with another string
import { Transform } from 'stream';

export class ReplaceStream extends Transform {
    //constructor for the ReplaceStream class
    constructor(searchStr, replaceStr, options){
        //call the parent constuctor
        super({...options});
        //initialize search an replace strings
        this.searchStr = searchStr;
        //initialize replace string
        this.replaceStr = replaceStr;
        //initialize tail to handle split strings across chunks
        this.tail = '';
    }
    //override _transform method to handle chunk processing
    _transform(chunk, encoding, callback){
        //calculate length of tail to retain for next chunk
        const pieces = (this.tail + chunk).split(this.searchStr);
        //retain the last part of the split string as tail
        const lastPiece = pieces[pieces.length - 1];
        //the length of the search string minus one
        const tailLen = this.searchStr.length - 1;
        //calculate length of tail to retain
        this.tail = lastPiece.slice(-tailLen)
        //join all pieces except the last one with the replace string
        pieces[pieces.length - 1] = lastPiece.slice(0, -tailLen);
        //push the transformed chunk to the readable side
          this.push(pieces.join(this.replaceStr));
          //call the callback to signal completion
          callback()
    }
    //override _flush method to handle any remaining tail data
  _flush(callback) {
    //push any remaining tail data
    this.push(this.tail);
    //call the callback to signal completion
    callback();
  }
}