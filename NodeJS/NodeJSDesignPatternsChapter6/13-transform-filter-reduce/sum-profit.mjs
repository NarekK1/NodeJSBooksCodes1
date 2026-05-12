import { Transform } from 'stream';

//a transform stream that sums the profit from records
export class SumProfit extends Transform {
    //constructor initializes the stream in object mode and sets the initial total to zero
    constructor(options = {}){
        //ensure the stream operates in object mode
        options.objectMode = true;
        //call the parent constructor
        super(options);
        //initialize the total profit to zero
        this.total = 0;
    }
    //the _transform method processes each record
    _transform(record, enc, cb){
        //add the profit from the current record to the total
        this.total += Number.parseFloat(record.profit);
        //call the callback to indicate that the processing for this record is complete
        cb();
    }
    //the _flush method is called when there are no more records to process
    _flush(cb){
        //push the final total as a string to the output
        this.push(this.total.toString());
        //call the callback to indicate that the flush operation is complete
        cb();
    }
}