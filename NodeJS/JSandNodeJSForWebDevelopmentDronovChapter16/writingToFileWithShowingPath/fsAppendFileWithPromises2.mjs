import promises from 'fs/promises';

//appendFile() method is used to append data to a file.
const myPromise = promises.appendFile('./writingToFileWithShowingPath/file8.txt', '\nString2', {encoding: 'utf8'});

//handling the promise returned by appendFile() method
myPromise.then(function() {
    console.log('Data appended to file successfully');
}).catch(function(err) {
    console.error(err.message);
})