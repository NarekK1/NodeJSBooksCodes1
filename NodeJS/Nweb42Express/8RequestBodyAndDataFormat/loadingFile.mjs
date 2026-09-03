import express from "express";
import multer from "multer";

//create an instance of express application
const app = express();

//upload configuration for multer to specify the destination folder for uploaded files
const upload = multer({ dest: 'upload' });

//simple request logger: place before routes
app.post('/upload', upload.single('file'), (req, res) => {
    //log the HTTP method and URL of the incoming request
    console.log(req.file);
    //send a response indicating that the file has been uploaded successfully
    res.send('File uploaded');
});

//listener to start the server and listen for incoming requests on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})