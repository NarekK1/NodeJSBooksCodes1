//import neccessary modules promisified fs, zlib gzip and util promisify
import { promises as fs } from 'fs';
import { gzip } from 'zlib';
import { promisify } from 'util';
//Promisift the gzip function
const gzipPromise = promisify(gzip);

//get the filename from command line arguments
const filename = process.argv[2];
//main function to read, gzip and write the file
async function main() {
    //read the file
    const data = await fs.readFile(filename);
    //gzip the data
    const gzippedData = await gzipPromise(data);
    //write the gzipped data to a new file
    await fs.writeFile(`${filename}.gz`, gzippedData);
    //log success message
    console.log('File successfully gzipped');
}

main();