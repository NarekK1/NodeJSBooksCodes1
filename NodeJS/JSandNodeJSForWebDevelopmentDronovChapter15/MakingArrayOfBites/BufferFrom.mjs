//the Buffer.from() method creates a new Buffer containing the specified string, array, or buffer.
let buf = Buffer.from('test', 'latin1');
//log the contents of the buffer, which will be a sequence of bytes representing the string 'test' in latin1 encoding.
console.log(buf);
//log the contentes of the buffer as a string, which will be 'test' since the buffer was created from that string
console.log(buf.toString('latin1'));
//the utf8 encoding is the default encoding for Buffer
buf = Buffer.from('тест', 'utf8');
console.log(buf);
//log the contents of the buffer as a string, which will be 'тест' since the buffer was created from that string
console.log(buf.toString());
//the hex encoding represents the buffer as a sequence of hexadecimal digits.
buf = Buffer.from('d182d0b5d181d182', 'hex');
//log the contents of the buffer, which will be a sequence of bytes corresponding to the hexadecimal representation of the string 'тест' in utf8 encoding.
console.log(buf);
//log the contents of the buffer as a string, which will be 'тест' since the buffer was created from that string in hex encoding.
console.log(buf.toString());

let buf2 = Buffer.from(buf);
buf2[0] = 0x6c;
buf2[1] = 0x69;
console.log(buf2.toString('latin1'));
console.log(buf.toString('latin1'));