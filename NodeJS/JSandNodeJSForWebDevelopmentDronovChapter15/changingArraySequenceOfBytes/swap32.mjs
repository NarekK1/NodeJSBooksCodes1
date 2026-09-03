//create a buffer with 4 bytes
const buf = Buffer.from([0x01, 0x02, 0x03, 0x04]);
//swap the byte order of the buffer using the swap32 method
buf.swap32();
//log the buffer to the console
console.log(buf);

//create a buffer with 5 bytes
const buf2 = Buffer.from([0x01, 0x02, 0x03, 0x04, 0x05]);
//swap the byte order of the buffer using the swap32 method
buf2.swap32();
//log the buffer to the console but it will not swap the last byte because it is not a multiple of 4
console.log(buf2);