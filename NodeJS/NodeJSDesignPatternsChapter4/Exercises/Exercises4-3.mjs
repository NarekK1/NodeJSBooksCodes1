import fs from 'fs';
function recursiveFind(dir, keyword, cb){
fs.readdirSync(dir,{encoding: 'utf-8'}, (err, data) => {
    if(err){
        return cb(err);
    }
      const result = [];
    //   const files = data.forEach(file => cb(fs.readdirSync(file, {encoding: 'utf-8'})));        
//    let readsFile = fs.readFileSync(dir, keyword, 'utf-8');
    data.forEach((entry) => {
        const fullPath = dir + '/' + entry.name;
        if(entry.isDirectory()){
            recursiveFind(fullPath, keyword, (err, subResults) => {
                if(err){
                    return cb(err);
                }
                result.push(...subResults);
            });
            if(entry.isFile()){
                fs.readFileSync(fullPath, 'utf-8', (err, content) => {
                    if(err){
                        return cb(err);
                    }
                if(content.includes(keyword)){
                    result.push(fullPath);
                }
            })
        }
    }
    })
    
    // if(files.includes(keyword)){
    //     result.push(readsFile);

    // }
        // return cb(result);
   
    },{withFileTypes: true}); 

}
recursiveFind('./', 
'Allahu Akbar 2', 
console.log());