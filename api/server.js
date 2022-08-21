const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const { json } = require('body-parser');
const { nanoid } = require('nanoid');

dotenv.config({ path: './config.env' });

const app = express();

app.use(cors());
app.use(json());

let todos = [
	{
		id: nanoid(),
		title: 'mazda3',
		completed: true,
	},
	{
		id: nanoid(),
		title: 'benz',
		completed: false,
	},
	{
		id: nanoid(),
		title: 'toyota',
		completed: false,
	},
	{
		id: nanoid(),
		title: 'bmw',
		completed: false,
	},
	{
		id: nanoid(),
		title: 'audi',
		completed: false,
	},
];

app.get('/todos', (req, res) => res.status(200).send(todos));

app.get('/todos/:title', (req, res) => {
	const title = req.params.title;
	// const todo = todos.find((todo) => todo.title === title);
	let todo = [];

	todos.forEach((e) => {
		if (e.title === title) {
			todo.push(e);
		}});


	if (!title) {
		return res.status(400).send('id is required');
	} else {
		res.status(200).send(todo);
	}

});

app.post('/todos', (req, res) => {
	const todo = { title: req.body.title, id: nanoid(), completed: false };
	todos.push(todo);
	return res.send(todo);
});

app.patch('/todos/:id', (req, res) => {
	const id = req.params.id;
	const index = todos.findIndex((todo) => todo.id == id);
	const completed = Boolean(req.body.completed);
	const title = String(req.body.title)

	if (index > -1) {

		if (completed != "undefined") {
			todos[index].completed = completed;

		}
		if (title != "undefined") {
			todos[index].title = title;

		}
	}


	return res.send(todos[index]);
});

app.delete('/todos/:id', (req, res) => {
	const id = req.params.id;
	const index = todos.findIndex((todo) => todo.id == id);
	if (index > -1) {
		todos.splice(index, 1);
	}

	res.send(todos);
});

const PORT = 7000;

app.listen(PORT, console.log(`Server running on port ${PORT}`.green.bold));
