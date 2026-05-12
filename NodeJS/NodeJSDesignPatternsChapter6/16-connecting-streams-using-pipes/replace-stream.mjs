import { Transform } from 'stream'; 

//a transform stream that replaces all occurrences of searchStr with replaceStr
export class ReplaceStream extends Transform  {
    //options can include encoding, objectMode, etc
    constructor(searchStr, replaceStr, options){
        //call the super constructor with options
        super({...options});
        //store the search and replace strings
        this.searchStr = searchStr;
        //store the replace string
        this.replaceStr = replaceStr;
        //initialize an empty tail string to handle split search strings
        this.tail =  '';
    }
    //implement the _transform method
    _transform(chunk, encoding, callback){
        //convert chunk to string if it's a buffer
        const pieces = (this.tail + chunk).split(this.searchStr);
        //store the last piece to handle potential split search strings
        const lastPiece = pieces[pieces.length - 1];
        //calculate the length of the tail to keep
        const tailLen = this.searchStr.length - 1;
        //update the tail with the end of the last piece
        this.tail = lastPiece.slice(-tailLen);

        //remove the tail from the last piece
        pieces[pieces.length - 1] = lastPiece.slice(0, -tailLen);
        //push the transformed data with replacements
        this.push(pieces.join(this.replaceStr));
        //call the callback to signal completion
        callback();
    }
    //implement the _flush method to handle any remaining tail data
    _flush(callback){
        //push any remaining tail data
        this.push(this.tail);
        //call the callback to signal completion
        callback();
    }
}