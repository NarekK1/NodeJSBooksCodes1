let buf1;
let buf2;
//create a buffer from an array of bytes
buf1 = Buffer.from([0x01, 0x02, 0x03, 0x04, 0x05]);
//create a buffer from a string
buf2 = Buffer.alloc(buf1.length);
//copy the contents of buf1 to buf2
buf2[0] = 0x55;
//log the contents of both buffers
console.log(buf1);
console.log(buf2);
//copy the contents of buf1 to buf2 starting from index 2
buf2.fill(0);
//log the number of bytes copied
console.log(buf1.copy(buf2, 2));
//log the contents of both buffers
console.log(buf2);
//copy the contents of buf1 to buf2 starting from index 2 and ending at index 4
buf2.fill(0);
//log the number of bytes copied
console.log(buf1.copy(buf2, 2, 1, 3));
//log the contents of both buffers
console.log(buf2);
//copy the contents of buf1 to buf2 starting from index 2 and ending at index 4 using a Uint8Array
buf2 = new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00]);
//log the number of bytes copied
console.log(buf1.copy(buf2));
//log the contents of both buffers
console.log(buf2);