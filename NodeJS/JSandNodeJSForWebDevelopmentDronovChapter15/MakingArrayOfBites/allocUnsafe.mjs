//allocating a buffer of 5 bytes without initializing it
const buf = Buffer.allocUnsafe(5);
console.log(buf);
//filling the buffer with 5s
buf.fill(5);
console.log(buf);