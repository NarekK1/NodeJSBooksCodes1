import buffer from 'buffer';

//creating a buffer from a string with utf16le encoding
const buf = Buffer.from('test', 'utf16le');
//trandcoding a buffer from utf16le to utf8
const buf2 = buffer.transcode(buf, 'utf16le', 'utf8');

//logs the original buffer as a string and the transcoded buffer as a string
console.log(buf.toString('utf16le'));
console.log(buf2.toString('utf8'));