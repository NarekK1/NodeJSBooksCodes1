//this code demonstrates how to calculate the byte length of a string and a buffer using different encodings
console.log(Buffer.byteLength('test', 'latin1'));
//the byte length of the string 'test' in latin1 encoding is 4
const buf = Buffer.from('test', 'latin1');
//the byte length of the buffer created from the string 'test' in latin1 encoding is also 4
console.log(Buffer.byteLength(buf));
//the byte length of the buffer is 4, which is the same as the byte length of the original string
const arr = new Uint8Array([116, 101, 115, 116]);
//the byte length of the array buffer created from the Uint8Array is 4, which is the same as the byte length of the original string and buffer
console.log(Buffer.byteLength(arr.buffer));