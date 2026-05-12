//substr substring slice splice nayel
let str = "Hello this is a string";

//substr@ hnacela
console.log(str.substr(0, 5), ' 1-:this is substr from index 0 and index 5');
console.log(str.substr(3, 2), ' 2-:this is substr from index 3 and index 2');
console.log(str.substr(-3, 2), ' 3-:this is substr from index -3 and index 2');
console.log(str.substr(0), ' 4-:this is substr from index 0 and till end of string');
console.log(str.substr(3, -2), ' 5-:this is substr from index 3 and index -2 which is treated as 0');
console.log(str.substr(-3, -2), " 6-:this is substr from index -3 and inex -2 which is treated as 0");
console.log(str.substr(-3), ' 7-:this is substr from index -3 and till end of string');
console.log(str.substr(3), ' 8-:this is substr from index 3 and till end of string');
console.log(str.substr(22), ' 9-:this is number of characters to be extracted is greater than the length of end of string');


console.log('\n-----------------------------\n');

console.log(str.substring(0, 5), ' 1-:this is substring from index 0 to index 5');
console.log(str.substring(3, 2), ' 2-:this is substring from index 3 to index 2 which is treated as substring from index 3 to index 2');
console.log(str.substring(-3, 2), ' 3-:this is substring from index -3 to index 2 which is treated as substring from index -3 to index 2');
console.log(str.substring(0), ' 4-:this is substring from index 0 to end of string');
console.log(str.substring(3, -2), ' 5-:this is substring from index 3 to index -2 which is treated as substring from index 3 to index -2');
console.log(str.substring(-3, -2), ' 6-:this is substring from index -3 to index -2 which is treated as substring from index -3 to index -2');
console.log(str.substring(-3), ' 7-:this is substring from index -3 to end of string');
console.log(str.substring(3), ' 8-:this is substring from index 3 to end of string');
console.log(str.substring(22), ' 9-:this is number of characters to be extracted is greater than the length of end of string');

console.log('\n-----------------------------\n');

console.log(str.slice(0, 5), ' 1-:this is splice from index 0 to index 5');
console.log(str.slice(3, 2), ' 2-:this is splice from index 3 to index 2 which is treated as empty string');
console.log(str.slice(-3, 2), ' 3-:this is splice from index -3 to index 2 which is treated as empty string');
console.log(str.slice(0), ' 4-:this is splice from index 0 to end of string');
console.log(str.slice(3, -2), ' 5-:this is splice from index 3 to index -2');
console.log(str.slice(-3, -2), ' 6-:this is splice from index -3 to index -2');
console.log(str.slice(-3), ' 7-:this is splice from index -3 to end of string');
console.log(str.slice(3), ' 8-:this is splice from index 3 to end of string');
console.log(str.slice(22), ' 9-:this is number of characters to be extracted is greater than the length of end of string');
