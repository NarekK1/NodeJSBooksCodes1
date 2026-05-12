//Imports net library from node core module
const net = require("net");
//Sets host name
const HOSTNAME = "localhost";
const PORT = 3000;

//conecting to the servers
const socket = net.connect(PORT, HOSTNAME);
socket.write("World");

//listens to data returned by socket
socket.on("data", function(data){
    console.log(data.toString());
})