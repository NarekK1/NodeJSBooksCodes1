//allocate a buffer of 5 bytes and fill it with the value 1
const buf = Buffer.alloc(5);
buf.fill(1);
console.log(buf);
//allocate a buffer of 5 bytes and fill it with the value 1 from index 1 to index 4
const buf2 = Buffer.alloc(5).fill(1, 1, 4);
console.log(buf2);