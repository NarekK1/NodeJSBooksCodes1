import fs from 'fs';

function concatFiles(destination, ...args) {
  // Extract callback (last argument) and file paths (all others)
  const callback = args.pop();
  const files = args;

  if (files.length === 0) {
    return callback(new Error('No files to concatenate'));
  }

  const contents = [];
  let completed = 0;

  // Read all files asynchronously, preserving order
  files.forEach((file, index) => {
    fs.readFile(file, 'utf-8', (err, data) => {
      if (err) return callback(err);

      contents[index] = data;
      completed++;

      // Once all files are read, concatenate and write to destination
      if (completed === files.length) {
        fs.writeFile(destination, contents.join(''), 'utf-8', callback);
      }
    });
  });
}

// Example usage:
concatFiles(
  'C:\\Users\\Narek\\Desktop\\JavaScript\\NodeJS\\NodeJSDesignPatternsChapter4\\Exercises\\dest.txt',
  'C:\\Users\\Narek\\Desktop\\JavaScript\\NodeJS\\NodeJSDesignPatternsChapter4\\Exercises\\hello.txt',
  'C:\\Users\\Narek\\Desktop\\JavaScript\\NodeJS\\NodeJSDesignPatternsChapter4\\loige.co\\about.html',
  (err) => {
    if (err) {
      console.error('Error concatenating files:', err);
    } else {
      console.log('Files concatenated successfully');
    }
  }
);