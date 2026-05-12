import { Transform } from 'stream';

//a transform stream that processes chunks with limited parallelism
export class LimitedParallelStream extends Transform {
    //constructor takes concurrency limit, user-defined transform function, and options
    constructor(concurrency, userTransform, opts){
        //ensure object mode is enabled
        super(({...opts, objectMode: true}));
        //store concurrency limit and user-defined transform function
        this.concurrency = concurrency;
        //store the user-defined transform function
        this.userTransform = userTransform;
        //track the number of running transformations
        this.running = 0;
        //callback to call when we can continue processing
        this.continueCb = null;
        //callback to call when all transformations are complete
        this.terminateCb = null;
    }
    //transform method processes each chunk with concurrency limit
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
        //if we are below the concurrency limit, call done immediately
        if(this.running < this.concurrency){
            done();
        }
        //if we have reached the concurrency limit, store the done callback to call later
        else{
            this.continueCb = done;
        }
    }
    //flush method is called when there are no more chunks to process
    _flush(done){
        //if there are running transformations, store the done callback to call later
        if(this.running > 0){
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
        //call the continue callback if set to allow processing of next chunk
        const tmpCb = this.continueCb;
        //reset continueCb to null
        this.continueCb = null;
        //call the stored continue callback
        tmpCb && tmpCb();
        //if no more running transformations and termianateCb is set, call it
        if(this.running === 0){
            this.terminateCb && this.terminateCb();
        }
    }
}