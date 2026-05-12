import { createReadStream } from 'fs';
import { createGunzip } from 'zlib';
import { parse } from 'csv-parse';

const inputPath = process.argv[2];
const readCsvStream = createReadStream(inputPath);
const gzip = createGunzip();
const csvParser = parse({ columns: true, skip_empty_lines: true, trim: true });

let count = 0;
readCsvStream
    .pipe(gzip)
    .pipe(csvParser)
    .on('data', (record) => {
        if (count < 3) {
            console.log('Record:', JSON.stringify(record, null, 2));
            count++;
        } else {
            process.exit(0);
        }
    })
    .on('end', () => {
        console.log('Done peeking');
    });
