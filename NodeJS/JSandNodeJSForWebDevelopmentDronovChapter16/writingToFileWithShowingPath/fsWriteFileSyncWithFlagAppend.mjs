import fs from 'fs';

fs.writeFileSync('./writingToFileWithShowingPath/file1.txt', '\nString2', {
    encoding: 'utf8',
    flag: 'a'
});

console.log('File written successfully with flag "a" (append).');