//import cities from "cities";
const cities = require("cities");
// Lookup city by ZIP code and store the result in a variable
var myCity = cities.zip_lookup("10016");
// Print the city information to the console
console.log(myCity);

