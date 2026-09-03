//allocating a buffer of 5 bytes
const buf = Buffer.alloc(5);
//filling the buffer with the value 1
const buf2 = Buffer.alloc(5, 1);

//logging the buffer and its length
console.log(buf);
console.log(buf.length)
console.log(buf2);