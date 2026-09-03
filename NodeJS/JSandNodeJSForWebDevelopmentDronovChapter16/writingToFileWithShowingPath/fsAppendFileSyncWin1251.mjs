import iconv from 'iconv-lite';
import fs from 'fs';

//encoding 'win1251' is not supported by default in Node.js, so we use the 'iconv-lite' library to encode the string before writing it to the file.
const data = iconv.encode('\nString2', 'win1251');

//fs.appendFileSync() is used to append data to a file. If the file does not exist, it will be created. In this case, we are appending the encoded string to 'cp1251.txt'.
fs.appendFileSync('cp1251.txt', data);
console.log('Data written successfully')