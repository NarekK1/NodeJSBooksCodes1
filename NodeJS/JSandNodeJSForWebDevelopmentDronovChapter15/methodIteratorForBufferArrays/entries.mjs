//create a buffer from an array
const buf = Buffer.from([5, 6, 7]);

//get the entries of the buffer
const iterator = buf.entries();

//iterate over the entries of the buffer and print the keys and values
for(const [key, value] of iterator){
    //print the keys
    process.stdout.write(`${key} => ${value} `);
}

//logs a new line
console.log();

//convert the iterator to an array and print it
const arrEntries = [...buf.entries()];
//print the array of keys
console.log(arrEntries);