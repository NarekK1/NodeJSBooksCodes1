//create a buffer of 4 bytes, fill it with the string 'test' using latin1 encoding
let buf = Buffer.alloc(4, 'test', 'latin1');

//log the buffer to the console
console.log(buf);
//log the buffer as a string using latin1 encoding
console.log(buf.toString('latin1'));
//change the buffer to use utf8 encoding and fill it with the string 'тест'
buf = Buffer.alloc(8, 'тест', 'utf8');
//log the buffer to the console
console.log(buf);
//log the buffer as a string using utf8 encoding
console.log(buf.toString());
//create a buffer of 8 bytes, fill it with the string 'тест' using hex encoding
buf = Buffer.alloc(8, 'd182d0b5d181d182', 'hex');
//log the buffer to the console
console.log(buf);
//log the buffer as a string using utf8 encoding
console.log(buf.toString());