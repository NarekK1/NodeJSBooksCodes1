import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';

//get the current file path and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//create an instance of the express application
const app = express();

//serve static files from the 'files' and 'files/images' directories
app.use(express.static(path.join(__dirname, 'files'))); 
app.use(express.static(path.join(__dirname, 'files', 'images')));

//start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});