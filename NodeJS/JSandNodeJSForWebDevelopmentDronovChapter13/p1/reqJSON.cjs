//the require function reads the file and parses the JSON content into  a JavaScript object, which is then assigned to the variable json
const json = require('./myJSON.json');
//the console.log statements are used to output the entire json object
console.log(json);
//logs the value of the id property of the json object to the console
console.log(json.id);
//logs the value of the status property of the json object to the console
console.log(json.status);