//creates a module with two values A and B, and exports a function that returns an object containing these values
const A = "value A";
const B = "value B";
exports.values = function(){
    return {A: A, B: B};
}