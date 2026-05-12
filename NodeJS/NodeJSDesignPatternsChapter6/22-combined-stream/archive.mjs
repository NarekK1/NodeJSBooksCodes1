import { createReadStream, createWriteStream } from "fs";
import { pipeline } from 'stream';
import { randomBytes } from "crypto";
import { createCompressAndEncrypt } from "./combined-streams.mjs";

//get password and source file from  command line arguments
const [,, password, source] = process.argv;
//generate a random initialization vector for encryption
const iv = randomBytes(16);
//define destination file name by appending .gz.enc to source file name
const destination = `${source}.gz.enc`;

//pipeline to read from source file, compress and encrypt the data, and write to destination file
pipeline(
    //read data from source file
    createReadStream(source),
    //compress and encrypt the data using the provided password and generated iv
    createCompressAndEncrypt(password, iv),
    //write the compressed and encrypted data to the destination file
    createWriteStream(destination),
    //handle completion or errors in the pipeline
    err => {
        //log error and exit if any error occurs
        if(err){
            console.error(err);
            process.exit(1);
        }
        //log successful creation of the destination file with iv
        console.log(`${destination} created with iv: ${iv.toString('hex')}`);
    }

)