//allocate a buffer of 10 bytes and write the string 'test' to it
const buf = Buffer.alloc(10);
//write the string 'test' to the buffer and log the number of bytes written
console.log(buf.write('test'));
//log the contents of the buffer
console.log(buf);
