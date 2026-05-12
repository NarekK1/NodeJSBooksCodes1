import fs from 'fs';
import path from 'path';

// Callback-style: listNestedFiles(dir, callback)
// Takes a directory path and recursively finds all files
function listNestedFiles(dir, callback) {
  const results = [];

  function walk(currentDir, done) {
    fs.readdir(currentDir, { withFileTypes: true }, (err, entries) => {
      if (err) return done(err);

      let pending = entries.length;
      if (!pending) return done(null);

      entries.forEach((entry) => {
        const fullPath = path.join(currentDir, entry.name);
        
        if (entry.isDirectory && entry.isDirectory()) {
          // Recursively walk subdirectories
          walk(fullPath, (err) => {
            if (err) return done(err);
            if (--pending === 0) done(null);
          });
        } else {
          // Collect file path
          results.push(fullPath);
          if (--pending === 0) done(null);
        }
      });
    });
  }

  walk(dir, (err) => {
    if (err) return callback(err);
    callback(null, results);
  });
}

// Test the function
listNestedFiles('C:\\Users\\Narek\\Desktop\\JavaScript\\NodeJS\\NodeJSDesignPatternsChapter4', (err, files) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('Found files:');
    files.forEach(file => console.log(file));
  }
});