//allocate a buffer of 7 bytes and fill it with the values 1 and 2
const buf = Buffer.alloc(7);
//fill the buffer with the values 1 and 2
buf.fill(Buffer.from([1, 2]));
console.log(buf);
//fill the buffer with the values 3, 4, and 5
buf.fill(new Uint8Array([3, 4, 5]));
console.log(buf);