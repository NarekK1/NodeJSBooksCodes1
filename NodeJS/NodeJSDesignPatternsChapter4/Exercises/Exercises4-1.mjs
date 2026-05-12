import fs from 'fs';
// Synchronous version of concatFiles
function concatFiles(destination, ...files){
    // Read all file sychronously and concatenate their contents
  const data = fs.readFileSync(...files, {encoding: 'utf-8'},(err) => {
    //handle error
        if(err){
            return console.log(err);
        }
    })
    //write concatenated data to destination file
        return fs.writeFileSync(destination, data, {encoding: 'utf-8'});
}
concatFiles(
'C:\\Users\\Narek\\Desktop\\JavaScript\\NodeJS\\NodeJSDesignPatternsChapter4\\Exercises\\loige.co.html', 
'C:\\Users\\Narek\\Desktop\\JavaScript\\NodeJS\\NodeJSDesignPatternsChapter4\\Exercises\\dest.txt',
)