import React, { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import { useSelector, useDispatch } from 'react-redux';
import { getTodoAsync, getTodoAsyncByID } from '../../redux/todoSlice';
import { Flex, Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react'
import { AddIcon, SearchIcon } from '@chakra-ui/icons'
import toast from 'react-hot-toast';
import { Button, ButtonGroup } from '@chakra-ui/react'

const TodoList = () => {

	const todos = useSelector((state) => state.todos);

	const dispatch = useDispatch();
	const [value, setValue] = useState('');
	const [trigger, setTrigger] = useState(1);

	useEffect(() => {
		dispatch(getTodoAsync());

	}, [dispatch]);

	function offTrigger() {
		dispatch(getTodoAsync());
		setTrigger(1);
	}

	const searchSubmit = (event) => {

		event.preventDefault();
		console.log('search entered: ' + value);

		if (value.length == 0) {
			toast.error('Please enter a todo item');
		}
		else {
			dispatch(
				getTodoAsyncByID({
					title: value,
				})
			);
			setValue('');
			setTrigger(0);
			toast.success('search success! ' + value,
				{
					icon: '😎',
					style: {
						borderRadius: '10px',
						background: '#333',
						color: '#fff',
					},
				});
		}
	};

	return (
		<div>
			<InputGroup style={{ marginBottom: "2rem" }}>
				<Input type='text'
					placeholder='Search todo...'
					value={value}
					onChange={(event) => setValue(event.target.value)} />
				<InputRightElement children={<SearchIcon color='blue.500' style={{ cursor: "pointer" }} onClick={searchSubmit} />} />
			</InputGroup>
			{!trigger && (
				<div style={{ marginBottom: "2rem", display: "flex", justifyContent: "flex-end" }}>
					<Button colorScheme='gray' onClick={offTrigger}>clear</Button>
				</div>
			)}

			<ul>

				{todos.map((todo) => (
					<TodoItem id={todo.id} title={todo.title} completed={todo.completed} />
				))}
			</ul>

		</div>
	);
};

export default TodoList;
