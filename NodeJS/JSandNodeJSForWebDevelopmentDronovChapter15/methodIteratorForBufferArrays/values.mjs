//create a buffer from an array
const buf = Buffer.from([5, 6, 7, 8]);

//get the values of the buffer
const iterator = buf.values();

//iterate over the values
for(const value of iterator){
    //print the values
    process.stdout.write(`${value} `);
}

//logs a new line
console.log();

//convert the iterator to an array and print it
let arrValues = [...buf.values()];
//print the array of values
console.log(arrValues);
//convert the buffer to an array and print it
arrValues = [...buf];
//print the array of values
console.log(arrValues);