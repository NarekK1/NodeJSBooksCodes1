//allocates a new buffer of the specified size, 4096 bytes by default
const buf = Buffer.allocUnsafeSlow(5);
//the contents of the newly created Buffer are not initialized and may contain sensitive data.
console.log(buf);
//fills the buffer with zeros, which is a good practice to avoid potential security risks associated with uninitialized memory.
buf.fill(0);
//log the contents of the buffer after filling it with zeros
console.log(buf);