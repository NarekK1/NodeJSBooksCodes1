import { createCipheriv, randomBytes } from 'crypto';
import { create } from 'domain';
import { createReadStream } from 'fs';
import { request } from 'http';
import { createGzip } from 'zlib';
const filename = process.argv[2];
const serverHost = process.argv[3];
const secret = Buffer.from(process.argv[4], 'hex');
const iv = randomBytes(16);

const httpRequestOptions = {
    //hostname from command line argument
    hostname: serverHost,
    port: 3000,
    path: '/',
    //PUT method for file upload
    method: 'PUT',
    //set necessary headers
    headers: {
        //content type and encoding
        'Content-Type': 'application/octent-stream',
        'Content-Encoding': 'gzip',
        //filename header
        'X-Filename': basename(filename),
        //initialization vector header
        'X-Initialization-Vector': iv.toString('hex')
    }
}
//create the HTTP request
const req = request(httpRequestOptions, res => console.log(`Server response: ${res.statusCode}`));
//create read stream, pipe through gzip and ciper, then into request
createReadStream(filename)
.pipe(createGzip())
.pipe(createCipheriv('aes192', secret, iv))
.pipe(req);