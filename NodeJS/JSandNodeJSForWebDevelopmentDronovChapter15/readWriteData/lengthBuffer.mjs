//allocate a buffer of 10 bytes
const buf = Buffer.alloc(10);
//write the string 'test' to the buffer and log the number of bytes written
buf.write('test', 2, 3, 'latin1');
//log the contents of the buffer
console.log(buf);