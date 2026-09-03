//create a buffer of 8 bytes
const buf = Buffer.from([0x01,0x02,0x03,0x04,0x05,0x06,0x07,0x08]);
//swap the bytes in the buffer using the swap64 method
buf.swap64();
//print the buffer to the console
console.log(buf);

//create a buffer of 4 bytes
const buf2 = Buffer.from([0x01,0x02,0x03,0x04]);
//swap the bytes in the buffer using the swap64 method
buf2.swap64();
//print the buffer to the console but it should not change because the buffer is not multpile of 8 bytes
console.log(buf2);