//returns a new buffer that shares the same memory as the original, but with a different start and end index
let buf1 = Buffer.from([0x01, 0x02, 0x03, 0x04, 0x05]);
let buf2 = buf1.subarray();

//index 0 to index 5 (the entire buffer)
buf2[0] = 0x55;
//log the conteents of both buffers
console.log(buf1);
console.log(buf2);

//index 1 to index 3
buf2 = buf1.subarray(1, 3);
//log the contents of both buffers
console.log(buf2);

