//creat three buffers with different values
const buf1 = Buffer.from([1, 2, 3]);
const buf2 = Buffer.from([1, 2, 2]);
const buf3 = Buffer.from([1, 2, 4]);

//compare the buffers indexes and logs the results if they are equal, less than, or greater than each other
console.log(buf1.compare(buf2, 0, 2, 0, 2, buf1.length));
console.log(buf1.compare(buf2, 0, 2, 0, 2));
console.log(buf1.compare(buf3, 0, buf3.length, 0, buf1.length));
console.log(buf1.compare(buf3, 0, 2, 0, 2));