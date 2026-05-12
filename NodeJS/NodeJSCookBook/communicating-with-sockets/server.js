//Imports net library from node core module
const net = require("net");

//Sets host name
const HOSTNAME = "localhost";
const PORT = 3000;

//Creating server that listents to defined port and hostname
net.createServer(function(socket){
    console.log("Client connected.");
    socket.on("data", function(name){
    socket.write(`Hello ${name}!`);
})
}).listen(PORT, HOSTNAME);
