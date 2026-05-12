import fs from 'fs';
import { createServer } from 'http';
import { Readable, Writable, PassThrough } from 'stream';
import url from 'url';

const server = createServer(async (req, res) => {
  const { pathname } = url.parse(req.url || '/');

  // ============================================
  // READABLE STREAM EXAMPLES
  // ============================================

  // pipe() - directly pipe readable to writable (backpressure handled automatically)
  if (pathname === '/readable-pipe') {
    const readStream = fs.createReadStream('./sample.txt');
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    readStream.pipe(res);
    return;
  }

  // unpipe() - disconnect a readable from a writable mid-stream
  if (pathname === '/readable-unpipe') {
    const readStream = fs.createReadStream('./sample.txt');
    res.writeHead(200);
    readStream.pipe(res);
    // Unpipe after 100ms and end response
    setTimeout(() => {
      readStream.unpipe(res);
      res.end('(unpipe called - stream disconnected)\n');
    }, 100);
    return;
  }

  // wrap() - wraps old-style stream
  if (pathname === '/readable-wrap') {
    const oldStream = fs.createReadStream('./sample.txt');
    const wrapped = Readable.wrap(oldStream);
    res.writeHead(200);
    wrapped.on('data', (chunk) => res.write(chunk));
    wrapped.on('end', () => res.end());
    return;
  }

  // destroy() - terminate stream immediately
  if (pathname === '/readable-destroy') {
    const readStream = fs.createReadStream('./sample.txt');
    res.writeHead(200);
    let sent = 0;
    readStream.on('data', (chunk) => {
      res.write(chunk);
      sent += chunk.length;
      if (sent > 50) {
        readStream.destroy(new Error('Intentional destroy'));
      }
    });
    readStream.on('error', (err) => {
      res.write(`\n[Stream destroyed: ${err.message}]\n`);
      res.end();
    });
    return;
  }

  // read() - manually pull data from internal buffer
  if (pathname === '/readable-read') {
    const readStream = fs.createReadStream('./sample.txt');
    res.writeHead(200);
    readStream.on('readable', () => {
      let chunk;
      while ((chunk = readStream.read(16)) !== null) {
        res.write(chunk);
        res.write('\n');
      }
    });
    readStream.on('end', () => res.end());
    return;
  }

  // unshift() - push data back onto stream buffer
  if (pathname === '/readable-unshift') {
    const r = new Readable({ read() {} });
    r.push('Line 2\n');
    r.unshift('Line 1\n'); // Will be read first
    res.writeHead(200);
    r.pipe(res);
    r.push(null);
    return;
  }

  // resume() - resume paused stream
  if (pathname === '/readable-resume') {
    const readStream = fs.createReadStream('./sample.txt');
    res.writeHead(200);
    let paused = false;
    readStream.on('data', (chunk) => {
      res.write(chunk);
      if (!paused) {
        readStream.pause();
        paused = true;
        res.write('[PAUSED]');
        setTimeout(() => {
          readStream.resume();
          res.write('[RESUMED]\n');
        }, 500);
      }
    });
    readStream.on('end', () => res.end());
    return;
  }

  // pause() - pause stream from emitting data
  if (pathname === '/readable-pause') {
    const readStream = fs.createReadStream('./sample.txt');
    res.writeHead(200);
    readStream.pause();
    res.write('[Stream paused initially]\n');
    setTimeout(() => {
      readStream.resume();
      res.write('[Stream resumed after 1s]\n');
    }, 1000);
    readStream.on('data', (chunk) => res.write(chunk));
    readStream.on('end', () => res.end());
    return;
  }

  // setEncoding() - receive strings instead of Buffers
  if (pathname === '/readable-setencoding') {
    const readStream = fs.createReadStream('./sample.txt');
    readStream.setEncoding('utf8');
    res.writeHead(200);
    readStream.on('data', (chunk) => {
      res.write(`[String chunk: ${typeof chunk}] `);
      res.write(chunk);
    });
    readStream.on('end', () => res.end());
    return;
  }

  // 'readable' event - emitted when data is available to read
  if (pathname === '/event-readable') {
    const readStream = fs.createReadStream('./sample.txt');
    res.writeHead(200);
    readStream.on('readable', () => {
      res.write('[Readable event triggered]\n');
      let chunk;
      while ((chunk = readStream.read(8)) !== null) {
        res.write(chunk + ' ');
      }
    });
    readStream.on('end', () => res.end('[END EVENT]\n'));
    return;
  }

  // 'data' event - emitted when data is ready (default mode)
  if (pathname === '/event-data') {
    const readStream = fs.createReadStream('./sample.txt');
    res.writeHead(200);
    readStream.on('data', (chunk) => {
      res.write(`[Data event] ${chunk.length} bytes\n`);
    });
    readStream.on('end', () => res.end('[END EVENT]\n'));
    return;
  }

  // 'end' event - emitted when no more data
  if (pathname === '/event-end') {
    const readStream = fs.createReadStream('./sample.txt');
    res.writeHead(200);
    let count = 0;
    readStream.on('data', (chunk) => {
      count++;
      res.write(chunk);
    });
    readStream.on('end', () => {
      res.write(`\n[END event: received ${count} chunks]\n`);
      res.end();
    });
    return;
  }

  // 'error' event - emitted on read errors
  if (pathname === '/event-error') {
    const readStream = fs.createReadStream('./nonexistent.txt');
    res.writeHead(200);
    readStream.on('error', (err) => {
      res.write(`[Error event]: ${err.code} - ${err.message}\n`);
      res.end();
    });
    return;
  }

  // 'close' event - emitted when stream is closed
  if (pathname === '/event-close') {
    const readStream = fs.createReadStream('./sample.txt');
    res.writeHead(200);
    readStream.on('close', () => {
      res.write('[Close event emitted]\n');
      res.end();
    });
    readStream.on('data', (chunk) => res.write(chunk));
    return;
  }

  // ============================================
  // WRITABLE STREAM EXAMPLES
  // ============================================

  // write() - write data to writable stream
  if (pathname === '/writable-write') {
    const outStream = fs.createWriteStream('./output.txt');
    res.writeHead(200);
    const result1 = outStream.write('Line 1\n');
    const result2 = outStream.write('Line 2\n');
    res.write(`Write 1 returned: ${result1}\n`);
    res.write(`Write 2 returned: ${result2}\n`);
    outStream.end('Line 3 (from end)\n');
    outStream.on('finish', () => {
      res.write('Writable stream finished\n');
      res.end();
    });
    return;
  }

  // end() - signal end of writing
  if (pathname === '/writable-end') {
    const outStream = fs.createWriteStream('./output2.txt');
    res.writeHead(200);
    outStream.write('First chunk\n');
    outStream.write('Second chunk\n');
    outStream.end('Final data\n');
    outStream.on('finish', () => {
      res.write('[Finish event]: stream ended\n');
      res.end();
    });
    return;
  }

  // destroy() - terminate writable immediately
  if (pathname === '/writable-destroy') {
    const outStream = fs.createWriteStream('./output3.txt');
    res.writeHead(200);
    outStream.write('Data 1\n');
    outStream.write('Data 2\n');
    outStream.destroy(new Error('Intentional destroy'));
    outStream.on('error', (err) => {
      res.write(`[Error from destroy]: ${err.message}\n`);
      res.end();
    });
    return;
  }

  // cork() - buffer multiple writes, uncork() to flush
  if (pathname === '/writable-cork') {
    const outStream = fs.createWriteStream('./output4.txt');
    res.writeHead(200);
    outStream.cork(); // Buffer writes
    outStream.write('Buffered 1\n');
    outStream.write('Buffered 2\n');
    outStream.write('Buffered 3\n');
    res.write('[Cork: writes buffered]\n');
    setTimeout(() => {
      outStream.uncork(); // Flush buffer
      res.write('[Uncork: buffer flushed]\n');
    }, 500);
    outStream.on('finish', () => {
      res.write('[Finish: all data written]\n');
      res.end();
    });
    outStream.end();
    return;
  }

  // setDefaultEncoding() - set default encoding for writes
  if (pathname === '/writable-setdefaultencoding') {
    const outStream = fs.createWriteStream('./output5.txt');
    res.writeHead(200);
    outStream.setDefaultEncoding('utf8');
    outStream.write('String 1 (utf8)\n');
    outStream.write('String 2 (utf8)\n');
    outStream.end('Final (utf8)\n');
    outStream.on('finish', () => {
      res.write('[Finish with default encoding set]\n');
      res.end();
    });
    return;
  }

  // 'drain' event - emitted when write buffer is empty
  if (pathname === '/event-drain') {
    const outStream = fs.createWriteStream('./output6.txt');
    res.writeHead(200);
    let canContinue = true;
    
    function writeMany() {
      while (canContinue) {
        const data = 'x'.repeat(100) + '\n';
        canContinue = outStream.write(data);
      }
      if (!canContinue) {
        res.write('[Backpressure: buffer full, waiting for drain...]\n');
      }
    }
    
    outStream.on('drain', () => {
      res.write('[Drain event: buffer cleared, resuming writes]\n');
      canContinue = true;
      writeMany();
    });
    
    writeMany();
    outStream.end();
    outStream.on('finish', () => {
      res.write('[Finish: write stream completed]\n');
      res.end();
    });
    return;
  }

  // 'finish' event - emitted after end() called and all data written
  if (pathname === '/event-finish') {
    const outStream = fs.createWriteStream('./output7.txt');
    res.writeHead(200);
    outStream.write('Data 1\n');
    outStream.write('Data 2\n');
    outStream.end('Data 3\n');
    outStream.on('finish', () => {
      res.write('[Finish event: all data written to disk]\n');
      res.end();
    });
    return;
  }

  // 'error' event - emitted on write errors
  if (pathname === '/event-error-write') {
    const outStream = fs.createWriteStream('/invalid/path/output.txt');
    res.writeHead(200);
    outStream.on('error', (err) => {
      res.write(`[Error event]: ${err.code}\n`);
      res.end();
    });
    return;
  }

  // 'close' event - emitted when stream closed
  if (pathname === '/event-close-write') {
    const outStream = fs.createWriteStream('./output8.txt');
    res.writeHead(200);
    outStream.write('Data\n');
    outStream.end();
    outStream.on('close', () => {
      res.write('[Close event: stream and fd closed]\n');
      res.end();
    });
    return;
  }

  // 'pipe' event - emitted when pipe() called on this stream
  if (pathname === '/event-pipe') {
    const readStream = fs.createReadStream('./sample.txt');
    const outStream = fs.createWriteStream('./output9.txt');
    res.writeHead(200);
    
    outStream.on('pipe', (src) => {
      res.write('[Pipe event: readable stream piped to this writable]\n');
    });
    
    readStream.pipe(outStream);
    outStream.on('finish', () => {
      res.write('[Finish event: piped data written]\n');
      res.end();
    });
    return;
  }

  // 'unpipe' event - emitted when unpipe() called on this stream
  if (pathname === '/event-unpipe') {
    const readStream = fs.createReadStream('./sample.txt');
    const outStream = fs.createWriteStream('./output10.txt');
    res.writeHead(200);
    
    readStream.pipe(outStream);
    
    outStream.on('unpipe', (src) => {
      res.write('[Unpipe event: readable stream disconnected]\n');
    });
    
    setTimeout(() => {
      readStream.unpipe(outStream);
      res.write('[Unpipe called]\n');
      res.end();
    }, 200);
    return;
  }

  // ============================================
  // COMBINED EXAMPLES
  // ============================================

  // Pipe chain with multiple transforms
  if (pathname === '/pipe-chain') {
    const readStream = fs.createReadStream('./sample.txt');
    res.writeHead(200);
    res.write('[Piping read stream to response]\n');
    readStream.pipe(res);
    return;
  }

  // Manual backpressure handling
  if (pathname === '/backpressure') {
    const readStream = fs.createReadStream('./sample.txt');
    const outStream = fs.createWriteStream('./output11.txt');
    res.writeHead(200);
    
    let paused = false;
    readStream.on('data', (chunk) => {
      const canContinue = outStream.write(chunk);
      if (!canContinue && !paused) {
        readStream.pause();
        paused = true;
        res.write('[Backpressure: paused read]\n');
      }
    });
    
    outStream.on('drain', () => {
      if (paused) {
        readStream.resume();
        paused = false;
        res.write('[Drain: resumed read]\n');
      }
    });
    
    readStream.on('end', () => {
      outStream.end();
    });
    
    outStream.on('finish', () => {
      res.write('[Finish: done]\n');
      res.end();
    });
    return;
  }

  // Default: show available endpoints
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`
    <h1>Stream Methods & Events Demo</h1>
    <h2>Readable Stream Methods</h2>
    <ul>
      <li><a href="/readable-pipe">pipe()</a> - pipe to writable</li>
      <li><a href="/readable-unpipe">unpipe()</a> - disconnect from writable</li>
      <li><a href="/readable-wrap">wrap()</a> - wrap old-style stream</li>
      <li><a href="/readable-destroy">destroy()</a> - terminate immediately</li>
      <li><a href="/readable-read">read()</a> - manually pull data</li>
      <li><a href="/readable-unshift">unshift()</a> - push data back</li>
      <li><a href="/readable-resume">resume()</a> - resume paused stream</li>
      <li><a href="/readable-pause">pause()</a> - pause stream</li>
      <li><a href="/readable-setencoding">setEncoding()</a> - get strings instead of buffers</li>
    </ul>
    <h2>Readable Stream Events</h2>
    <ul>
      <li><a href="/event-readable">'readable'</a> - data available to read</li>
      <li><a href="/event-data">'data'</a> - data ready (default mode)</li>
      <li><a href="/event-end">'end'</a> - no more data</li>
      <li><a href="/event-error">'error'</a> - read error</li>
      <li><a href="/event-close">'close'</a> - stream closed</li>
    </ul>
    <h2>Writable Stream Methods</h2>
    <ul>
      <li><a href="/writable-write">write()</a> - write data</li>
      <li><a href="/writable-end">end()</a> - signal end of writing</li>
      <li><a href="/writable-destroy">destroy()</a> - terminate immediately</li>
      <li><a href="/writable-cork">cork()/uncork()</a> - buffer and flush writes</li>
      <li><a href="/writable-setdefaultencoding">setDefaultEncoding()</a> - set encoding</li>
    </ul>
    <h2>Writable Stream Events</h2>
    <ul>
      <li><a href="/event-drain">'drain'</a> - buffer cleared, ready for more</li>
      <li><a href="/event-finish">'finish'</a> - end() called and data written</li>
      <li><a href="/event-error-write">'error'</a> - write error</li>
      <li><a href="/event-close-write">'close'</a> - stream closed</li>
      <li><a href="/event-pipe">'pipe'</a> - readable piped in</li>
      <li><a href="/event-unpipe">'unpipe'</a> - readable disconnected</li>
    </ul>
    <h2>Combined Examples</h2>
    <ul>
      <li><a href="/pipe-chain">Pipe chain</a></li>
      <li><a href="/backpressure">Manual backpressure handling</a></li>
    </ul>
  `);
});

server.listen(3000, () => console.log('📡 Server running on http://localhost:3000'));
