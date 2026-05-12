const messageModule  = require('./messages');
// Print each message to the console
messageModule.messages.forEach(m => console.log(m));

exports.addNum = (x, y) => x + y;