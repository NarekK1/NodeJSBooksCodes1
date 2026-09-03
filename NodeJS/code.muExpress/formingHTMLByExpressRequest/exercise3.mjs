import express from 'express';

//create an instance of the express application
const app = express();

//array of employees to be sent as a response
const employees = [
	{
		surname: 'surname1',
		name:    'user1',
		salary:  1000,
	},
	{
		surname: 'surname2',
		name:    'user2',
		salary:  2000,
	},
	{
		surname: 'surname3',
		name:    'user3',
		salary:  3000,
	},
];

//route to handle GET requests to '/employees' and send an HTML response with the employee list
app.get('/employees', (req, res) => {
    //create an HTML table of employees
    let table = '<table border="1">';

    //each employee of the employees array make a table row with surname, name and salary
    for(const emp of employees){
        //append the employee surname, name and salary to the table string as a table row
        table += '<tr>';
        table += '<td>' + emp.surname + '</td>';
        table += '<td>' + emp.name + '</td>';
        table += '<td>' + emp.salary + '</td>';
        tabl
    }

    //close the table tag
    table += '</table>';
    //send the HTML response to the client
    res.send(table);
});

//start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})