const arr = new Uint8Array([116, 101, 115, 116]);
//create a buffer from the array buffer of the Uint8Array, starting at byte 1 and taking 2 bytes
let buf = Buffer.from(arr.buffer, 1, 2);
//the buffer will contain the bytes at index 1 and 2 of the Uint8Array, which correspond to the characters 'e' and 's'
console.log(buf);