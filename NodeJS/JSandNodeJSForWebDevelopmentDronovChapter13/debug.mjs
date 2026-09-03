//function to print a value in a fixed width field
function print(value){
    //convert the value to a string and pad it with spaces on the left to make it 3 characters wide
    const s = `${value}`.padStart(3);
    //write the string to the standard output
    process.stdout.write(s);
}
//define a 2D array of numbers
const arr = [
    [1, 2, 3, 4], 
    [5, 6, 7, 8]
];
let i = 0; let j = 0;
//iterate over the rows of the array
for(i = 0; i < arr.length; i++){
    //iterate over the columns of the current row, starting from the second element
    for(j = 0; j < arr[i].length; j++){
        //print the current element using the print function
        print(arr[i][j]);
    }
    //after printing all the elements of the current row, write a newline character to the standard output
    process.stdout.write('\n');
}
