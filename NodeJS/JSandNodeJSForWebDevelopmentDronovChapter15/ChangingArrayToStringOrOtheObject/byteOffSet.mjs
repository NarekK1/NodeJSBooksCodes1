const buf = Buffer.from([1, 2, 3]);
//this will create a new Uint8Array that shares the same underlying ArrayBuffer as the original Buffer, but with a different byte offset and length
let arr = new Uint8Array(buf.buffer, buf.byteOffset, buf.length / Uint8Array.BYTES_PER_ELEMENT);
console.log(arr);

//modifying the Uint8Array will also modify the original Buffer, since they share the same underlying ArrayBuffer
arr[0] = 55;

console.log(arr);
console.log(buf);