const array = [1, 2, 3, 4, 5];

//splicedArray is the array of deleted elements
// const splicedArray = array.splice(1, 2);
// splicedArray1 is the array of deleted elements and 6,7 are added at index 2
// const splicedArray2 = array.splice(2, 3, 6, 7);
// splicedArray2 is the array of deleted elements and 8,9 are added at index 2 without deleting any element
// const splicedArray3 = array.splice(2, 0, 8, 9);

//splice method modifies the original array and returns the array of deleted elements
console.log(array.splice(2, 1), 'this is splice from index 2 and delete 1 element');
console.log(array.splice(2, 0), 'this is splice from index 2 and delete 0 element');
console.log(array.splice(-2, 2), 'this is splice from index -2 and delete 2 element');
// console.log(splicedArray);
console.log(array);
// console.log(splicedArray3);
