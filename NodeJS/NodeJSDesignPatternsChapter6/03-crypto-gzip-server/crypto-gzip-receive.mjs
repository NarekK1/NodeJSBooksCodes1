import {createDecipheriv, randomBytes } from 'crypto';
//script to generate a random secret key
const secret = randomBytes(24);
//log the secret in hexadecimal format
console.log(`Generated secret: ${secret.toString('hex')}`);
//create an HTTP server to receive gzipped files
const server = createServer((req, res) => {
    //extract filename from headers
    const filename = basename(req.headers['x-filename']);
    const iv = Buffer.from(req.headers['x-initialization-vector'], 'hex');
    //define destination path
    const destFilename = join('received_files', filename);
    //log the incoming request
    console.log(`File request received: ${filename}`);
        
    req
    //first pipe through decipher
    .pipe(createDecipheriv('aes192', secret, iv))
    //pipe the request through gunzip and write to destination file
    .pipe(createGunzip())
    .pipe(createWriteStream(destFilename))
    //finish event to log success message and respond to client
    .on('finish', () => {
         res.writeHead(201, {'Content-Type': 'text/plain'});
         res.end('OK\n');
        //log success message
        console.log(`File saved: ${destFilename}`);
        })
    })
//start the server on port 3000
server.listen(3000, () => console.log('Listening on http://localhost:3000'));