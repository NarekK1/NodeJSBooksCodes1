import fs from 'fs';

function recursiveFind(dir, keyword, cb) {
  const results = [];
  
  // Read directory contents
  fs.readdir(dir, { withFileTypes: true }, (err, entries) => {
    if (err) {
      return cb(err);
    }
    
    if (entries.length === 0) {
      return cb(null, results);
    }
    
    let pending = entries.length;
    
    entries.forEach((entry) => {
      const fullPath = `${dir}/${entry.name}`;
      
      if (entry.isDirectory()) {
        // Recursively search subdirectories
        recursiveFind(fullPath, keyword, (err, subResults) => {
          if (err) {
            return cb(err);
          }
          
          results.push(...subResults);
          pending--;
          
          if (pending === 0) {
            cb(null, results);
          }
        });
      } else if (entry.isFile() && entry.name.endsWith('.txt')) {
        // Read text files and check for keyword
        fs.readFile(fullPath, 'utf-8', (err, content) => {
          if (err) {
            // Skip files that can't be read
            pending--;
            if (pending === 0) {
              cb(null, results);
            }
            return;
          }
          
          if (content.includes(keyword)) {
            results.push(fullPath);
          }
          
          pending--;
          
          if (pending === 0) {
            cb(null, results);
          }
        });
      } else {
        // Not a text file or directory, skip it
        pending--;
        
        if (pending === 0) {
          cb(null, results);
        }
      }
    });
  });
}

// Test example
recursiveFind('./Exercises', 'Allahu Akbar', (err, files) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log('Files containing keyword:', files);
});