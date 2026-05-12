import { Transform } from 'stream';

//A transform stream that filters records by a specified country
export class FilterByCountry extends Transform {
    //The constructor take the country to filter by and options for the Transform stream
    constructor(country, options = {}){
        //Ensure the stream operates in object mode
        options.objectMode = true;
        //call the parent constructor
        super(options);
        //store the country to filter by
        this.country = country;
    }
    //the _transform method processes each record
    _transform(record, enc, cb){
        //if the record's country matches the specified country, push it to the output
        if(record.country === this.country){
            this.push(record);
        }
        //call the callback to indicate that the processing for this record is complete
        cb();
    }
}