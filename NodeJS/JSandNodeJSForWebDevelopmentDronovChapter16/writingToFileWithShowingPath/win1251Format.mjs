import iconv from 'iconv-lite';
import fs from 'fs';

//encoding string to win1251 format
const data = iconv.encode('String1', 'win1251');

//writing to file
fs.writeFileSync('cp1251.txt', data);

//logging success message
console.log('Sucessfully written ')