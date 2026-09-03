//creating a Uint8Array with specific values
const arr = new Uint8Array([209, 130, 208, 181, 209, 129, 209, 130]);

//logging the Uint8Array
const buf = Buffer.alloc(arr.length, arr);

//logging the buffer and its string representation
console.log(buf);
console.log(buf.toString());