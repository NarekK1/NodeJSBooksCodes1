import { connect } from 'net';
import { createReadStream } from 'fs';
import { basename } from 'path';
import { PassThrough } from 'stream';
import { randomBytes, scryptSync, createCipheriv } from 'crypto';

const [, , password, host = '127.0.0.1', port = '4000', ...files] = process.argv;

if (!password || files.length === 0) {
    console.error('Usage: node exercise6-4-tcp-client.mjs <password> [host] [port] <file1> <file2> ...');
    process.exit(1);
}

if (files.length > 255) {
    console.error('Maximum 255 files are supported per connection.');
    process.exit(1);
}

const MSG_META = 1;
const MSG_DATA = 2;
const MSG_END = 3;

const key = scryptSync(password, 'salt', 32);
const iv = randomBytes(16);
const cipher = createCipheriv('aes-256-ctr', key, iv);

const socket = connect({ host, port: Number(port) });
const plaintext = new PassThrough();

socket.on('connect', () => {
    const header = Buffer.concat([Buffer.from('MUX1'), iv]);
    socket.write(header);
    plaintext.pipe(cipher).pipe(socket);
    startUpload();
});

socket.on('error', (err) => {
    console.error('Socket error:', err.message);
    process.exit(1);
});

function sendFrame(channelId, payload, source) {
    const header = Buffer.alloc(5);
    header.writeUInt8(channelId, 0);
    header.writeUInt32BE(payload.length, 1);
    const ok = plaintext.write(Buffer.concat([header, payload]));
    if (!ok && source) {
        source.pause();
        plaintext.once('drain', () => source.resume());
    }
}

function startUpload() {
    let openChannels = files.length;

    files.forEach((filePath, index) => {
        const channelId = index;
        const fileName = basename(filePath);
        const src = createReadStream(filePath);

        const metaPayload = Buffer.concat([
            Buffer.from([MSG_META]),
            Buffer.from(JSON.stringify({ filename: fileName }))
        ]);
        sendFrame(channelId, metaPayload, src);

        src.on('data', (chunk) => {
            const payload = Buffer.concat([Buffer.from([MSG_DATA]), chunk]);
            sendFrame(channelId, payload, src);
        });

        src.on('end', () => {
            const endPayload = Buffer.from([MSG_END]);
            sendFrame(channelId, endPayload);
            if (--openChannels === 0) {
                plaintext.end();
            }
        });

        src.on('error', (err) => {
            console.error(`Read error for ${filePath}:`, err.message);
            plaintext.end();
        });
    });
}
