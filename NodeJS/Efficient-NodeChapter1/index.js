//imports the server from the server.mjs file
import { server } from './server.mjs';

//start the server and listen on port 3000
server.listen(3000, () => {
    //log a message to the console when the server is running
    console.log('Server is running...');
})