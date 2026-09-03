import promises from 'fs/promises';

//writing to file with showing path and using append flag to add content to the file instead of overwriting it with encoding utf8
const myPromise = promises.writeFile('./writingToFileWithShowingPath/file7.txt', '\nString2',{
    encoding: 'utf8',
    flag: 'a'
});

//handling the promise returned by writeFile method
myPromise.then(function(){
    //if the promise is resolved successfully, this block will be executed
    console.log('File written successfully');
}).catch(function(err){
    console.error(err.message);
})