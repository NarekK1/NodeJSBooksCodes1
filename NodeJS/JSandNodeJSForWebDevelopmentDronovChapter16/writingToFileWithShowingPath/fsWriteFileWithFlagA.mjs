import fs from 'fs';

fs.writeFile('./writingToFileWithShowingPath/file4.txt', '\nString2', {
    encoding: 'utf-8',
    flag: 'a'
}, function(err) {
    if(err){
        throw err;
    }
    console.log('Data appended successfully');
})