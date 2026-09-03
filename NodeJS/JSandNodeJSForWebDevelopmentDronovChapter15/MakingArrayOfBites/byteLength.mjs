//calculate the byte length of the string 'test' using latin1 encoding
const size = Buffer.byteLength('test', 'latin1');
//create a buffer of the calculated size, fill it with the string 'test' using latin1 encoding
const buf = Buffer.alloc(size, 'test', 'latin1');
//log the buffer to the console
console.log(buf);
//log the buffer as a string using latin1 encoding
console.log(buf.toString());