//create a buffer from an array
const buf = Buffer.from([5, 6, 7, 8]);

//get the keys of the buffer
const iterator = buf.keys();
console.log(iterator);

//iterate over the keys
for(const key of iterator){
    //print the keys
    process.stdout.write(`${key} `);
}

//logs a new line
console.log();

//convert the iterator to an array and print it
const arrKeys = [...buf.keys()];
//print the array of keys
console.log(arrKeys);