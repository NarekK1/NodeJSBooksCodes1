let count = 0;
//exports a function that increments the count variable and returns the new value CommonJS style
exports.next = function(){
    return ++count;
}
//exports a function that returns the string 'Hello, world!' CommonJS style
exports.hello = function(){
    return 'Hello, world!';
}