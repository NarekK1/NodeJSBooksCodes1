import crypto from 'crypto';
import { pipeline } from 'stream/promises';
import fs from 'fs';
import zlib from 'zlib';

//encrypt a file and write it to disk, while showing progress in the console
const file = process.argv[2];

//cryptographic parameters
const algorithm = 'aes-256-ctr';
//generate a random key and initialization vector
const key = crypto.randomBytes(32);
//generate a random initialization vector
const iv = crypto.randomBytes(16);

//create a pipeline that reads the file, encrypts it using AES-256-CTR, compresses it using gzip, and writes it to disk, while showing progress in the console
await pipeline(
    //create a readable stream from the file
    fs.createReadStream(file),
    //encrypt the file using AES-256-CTR
    crypto.createDecipheriv(algorithm, key, iv),
    //compress the file using gzip
    zlib.createGunzip(),
    // zlib.createGzip(),
    // crypto.createCipheriv(algorithm, key, iv),
    // fs.createWriteStream(file + '.gz')
    //create a transform stream that shows progress in the console
    fs.createWriteStream(file.slice(0, -3))
);