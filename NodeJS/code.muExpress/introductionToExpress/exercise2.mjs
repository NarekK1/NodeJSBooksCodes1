import express from 'express';

//create an instance of the express application
const app = express();

//define route handlers for different GET requests
app.get('/', (req, res) => {
    res.send('Main Page');
});

app.get('/about', (req, res) => {
    res.send('About Page');
});

app.get('/contact', (req, res) => {
    res.send('Contact Page');
});

app.get('/services', (req, res) => {
    res.send('Services Page');
});

app.get('/error', (req, res) => {
    res.send('Error');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})