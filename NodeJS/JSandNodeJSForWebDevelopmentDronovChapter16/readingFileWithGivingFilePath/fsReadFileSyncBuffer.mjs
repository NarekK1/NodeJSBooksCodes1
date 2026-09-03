import iconv from 'iconv-lite';
import fs from 'fs';

//read the file synchronously and get the content as a buffer
const buf = fs.readFileSync('cp1251.txt');
//logs the content of the file as a buffer to the console
console.log(buf);

//decode the buffer using the 'win1251' encoding and get the content as a string
const str = iconv.decode(buf, 'win1251');
//logs the content of the file as a string to the console
console.log(str);

