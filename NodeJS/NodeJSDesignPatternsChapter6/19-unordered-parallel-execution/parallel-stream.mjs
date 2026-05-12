import { Transform } from 'stream';

//A transform stream that processes chunks in parallel
export class ParallelStream extends Transform {
    //constructor takes a user-defined transform function and options
    constructor(userTransform, opts){
        //ensure object mode is enabled
        super({objectMode: true, ...opts});
        //store the user-defined transform function
        this.userTransform = userTransform;
        //track the number of running transformations
        this.running = 0;
        //callback to call when all transformations are complete
        this.terminateCb = null;        
    }
    //transform method processes each chunk
    _transform(chunk, enc, done){
        //increment the running count
        this.running++;
        //user-defined transform function is called with chunk, encoding, push function, and completion callback
        this.userTransform(
            chunk,
            enc,
            this.push.bind(this),
            this._onComplete.bind(this)
        )
        //immediately call done to signal that we are ready for the next chunk
        done();
    }
    //flush method is called when there are no more chunks to process
    _flush(done) {
        //if there are still running transformations, store the done callback
        if(this.running > 0) {
            this.terminateCb = done;
        }
        //if no running transformations, call done immediately
        else{
            done();
        }
    }
    //completion callback for each transformation
    _onComplete(err){
        //decrement the running count
        this.running--;
        //if there was an error,emit it
        if(err){
            return this.emit('error', err);
        }
        //if no more running transformations and termianateCb is set, call it
        else if(this.running === 0){
            this.terminateCb && this.terminateCb();
        }
    }
}