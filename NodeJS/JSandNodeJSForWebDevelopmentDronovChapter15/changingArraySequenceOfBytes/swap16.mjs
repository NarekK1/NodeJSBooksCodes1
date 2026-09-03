//create a buffer with 4 bytes
const buf = Buffer.from([0x01, 0x02, 0x03, 0x04]);
//swap the byte order of the buffer
buf.swap16();
console.log(buf);

//create a buffer with 3 bytes
const buf2 = Buffer.from([0x01, 0x02, 0x03]);
//swap the byte order of the buffer
buf2.swap16();
//the last byte is not swapped because the buffer has an odd number of bytes
console.log(buf2);