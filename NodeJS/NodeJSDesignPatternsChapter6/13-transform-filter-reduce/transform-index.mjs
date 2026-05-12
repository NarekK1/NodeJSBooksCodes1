import { createReadStream } from 'fs';
import { createGunzip } from 'zlib';
import { parse } from 'csv-parse';
import {  FilterByCountry } from './filter-by-country.mjs';
import { SumProfit } from './sum-profit.mjs';

const csvParser = parse({ columns: true });

// A small difference from the code presented in the book is that
// here we have gzipped the data to keep the download size of the repository
// as small as possible. For this reason we added an extra step that decompresses
// the data on the fly. The final result doesn't change

//create a pipeline that reads the gzipped CSV file, decompresses it
createReadStream('C:\\Users\\Narek\\Desktop\\JavaScript\\NodeJS\\NodeJSDesignPatternsChapter6\\13-transform-filter-reduce\\data.csv.gz')
//creates a stream that decompresses the data
.pipe(createGunzip())
//parses the CSV data
.pipe(csvParser)
//filters only the records from Italy
.pipe(new FilterByCountry('Italy'))
//sums the profit from the filtered records
.pipe(new SumProfit())
//outputs the result to the standard output
.pipe(process.stdout);
