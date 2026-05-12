import { createServer } from 'net';
import { createWriteStream, mkdirSync } from 'fs';
import { basename, join } from 'path';
import { PassThrough } from 'stream';
import { scryptSync, createDecipheriv } from 'crypto';

const [, , password, port = '4000', destDir = join(process.cwd(), 'received-files-tcp')] = process.argv;

if (!password) {
    console.error('Usage: node exercise6-4-tcp-server.mjs <password> [port] [destDir]');
    process.exit(1);
}

const MSG_META = 1;
const MSG_DATA = 2;
const MSG_END = 3;

const key = scryptSync(password, 'salt', 32);
mkdirSync(destDir, { recursive: true });

function demultiplex(source, onFrame) {
    let buffer = Buffer.alloc(0);

    source.on('data', (chunk) => {
        buffer = Buffer.concat([buffer, chunk]);
        while (buffer.length >= 5) {
            const channelId = buffer.readUInt8(0);
            const length = buffer.readUInt32BE(1);
            if (buffer.length < 5 + length) {
                break;
            }
            const payload = buffer.subarray(5, 5 + length);
            buffer = buffer.subarray(5 + length);
            onFrame(channelId, payload);
        }
    });

    source.on('end', () => {
        onFrame(null, null, true);
    });
}

const server = createServer((socket) => {
    const encryptedStream = new PassThrough();
    let headerBuffer = Buffer.alloc(0);
    let headerDone = false;
    let decipher = null;
    const channels = new Map();

    socket.on('data', (chunk) => {
        if (!headerDone) {
            headerBuffer = Buffer.concat([headerBuffer, chunk]);
            if (headerBuffer.length < 20) {
                return;
            }
            const magic = headerBuffer.subarray(0, 4).toString('utf8');
            if (magic !== 'MUX1') {
                socket.destroy(new Error('Invalid magic header'));
                return;
            }
            const iv = headerBuffer.subarray(4, 20);
            decipher = createDecipheriv('aes-256-ctr', key, iv);
            encryptedStream.pipe(decipher);
            demultiplex(decipher, onFrame);
            headerDone = true;
            const remaining = headerBuffer.subarray(20);
            if (remaining.length) {
                encryptedStream.write(remaining);
            }
            headerBuffer = Buffer.alloc(0);
        } else {
            encryptedStream.write(chunk);
        }
    });

    socket.on('end', () => {
        encryptedStream.end();
    });

    socket.on('error', (err) => {
        console.error('Socket error:', err.message);
    });

    function onFrame(channelId, payload, done) {
        if (done) {
            for (const stream of channels.values()) {
                stream.end();
            }
            return;
        }
        const messageType = payload.readUInt8(0);
        const data = payload.subarray(1);

        if (messageType === MSG_META) {
            let meta;
            try {
                meta = JSON.parse(data.toString('utf8'));
            } catch (err) {
                console.error('Invalid meta payload:', err.message);
                return;
            }
            const safeName = basename(meta.filename || `file-${channelId}`);
            const destPath = join(destDir, safeName);
            const stream = createWriteStream(destPath);
            channels.set(channelId, stream);
            console.log(`Receiving ${safeName} on channel ${channelId}`);
        } else if (messageType === MSG_DATA) {
            const stream = channels.get(channelId);
            if (stream) {
                stream.write(data);
            }
        } else if (messageType === MSG_END) {
            const stream = channels.get(channelId);
            if (stream) {
                stream.end();
                channels.delete(channelId);
                console.log(`Completed channel ${channelId}`);
            }
        }
    }
});

server.listen(Number(port), () => {
    console.log(`TCP server listening on 0.0.0.0:${port}`);
    console.log(`Saving files to: ${destDir}`);
});
