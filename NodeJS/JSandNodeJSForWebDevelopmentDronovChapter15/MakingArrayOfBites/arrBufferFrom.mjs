const arr = [116, 101, 115, 116];
//creates a new Buffer from the array of bytes
let buf = Buffer.from(arr);
//log the contents of the buffer
buf[0] = 0x6c;
buf[1] = 0x69;
//log the contents of the buffer as a string, which will be 'test' since the buffer was created from that array of bytes
console.log(buf);
console.log(arr);