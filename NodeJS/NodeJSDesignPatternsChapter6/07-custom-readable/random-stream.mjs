import { Readable } from 'stream';
import Chance from 'chance';

//A readable stream that genrerates random data
const chance = new Chance();


export class RandomStream extends Readable {
    constructor(options){
        //call the parent constructor
        super(options);
        //initialize emitted bytes counter
        this.emittedBytes = 0;
    }
    //The method generates a random string of length equal to size using chance
    _read(size){
        //generate a random string of the requested size
        const chunk = chance.string({length: size});
        //push the chunk to the stream
        this.push(chunk, 'utf8');
        //update the emitted bytes counter
        this.emittedBytes += chunk.length;
        //randomly end the stream
        if(chance.bool({likelihood: 5})){
            this.push(null);
        }
    }
}