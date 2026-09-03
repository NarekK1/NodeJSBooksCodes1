//create some buffers to compare
const buf1 = Buffer.from([1, 2, 3]);
const buf2 = Buffer.from([1, 2, 3]);
const buf3 = Buffer.from([1, 2, 2]);
const buf4 = Buffer.from([1, 2, 4]);

//compare the buffers and logs the results if they are equal, less than, or greater than each other
console.log(Buffer.compare(buf1, buf2));
console.log(Buffer.compare(buf1, buf3));
console.log(Buffer.compare(buf1, buf4));

//sort an array of buffers using the compare function and logs the sorted array
const arr = [buf1, buf3];
//add more buffers to the array
arr.sort(Buffer.compare);
//log the sorted array 
console.log(arr);