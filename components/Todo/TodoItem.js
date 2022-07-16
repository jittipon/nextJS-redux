import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleCompleteAsync, deleteTodoAsync, deleteTodo, editTodo, editTodoAsync } from '../../redux/todoSlice';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { EditIcon, } from '@chakra-ui/icons'
import toast from 'react-hot-toast';
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'

const TodoItem = ({ id, title, completed }) => {

	const [value, setValue] = useState('');

	const dispatch = useDispatch();

	const handleCompleteClick = () => {

		dispatch(toggleCompleteAsync({ id: id, completed: !completed }));

	}
	const handleDeleteClick = () => {

		dispatch(deleteTodoAsync({ id: id }));
		toast.success('deleted! ' + title,
			{
				icon: '💥',
				style: {
					borderRadius: '10px',
					//   background: '#333',
					//   color: '#fff',
				},
			});

	}
	const handleEditClick = (e) => {

		e.preventDefault();
		console.log('Edit index: ' + value);

		if (value.length == 0) {
			toast.error('please fill the form ' + title,
				{
					icon: '🚧',
					style: {
						borderRadius: '10px',
						//   background: '#333',
						//   color: '#fff',
					},
				});
		} else {
			dispatch(
				editTodoAsync({
					id: id,
					title: value
				}));
			setValue('');

		}

	}

	return (
		<li className={`list-group-item ${completed && 'list-group-item-success'}`}>
			<div className='d-flex justify-content-between'>
				<span className='d-flex align-items-center'>
					{/* <input type='checkbox' checked={completed} onChange={handleCompleteClick}></input> */}
					<Checkbox size='lg' colorScheme='green' defaultChecked={completed} onChange={handleCompleteClick}>
					</Checkbox>
					<span style={{ width: "10rem",marginLeft:"2rem" }}>
						{title}
					</span>

					<form onSubmit={handleEditClick} style={{ display: "flex", flexDirection: "row", marginLeft: "5rem" }} className='form-inline mt-3 mb-3'>
						{/* <input
							type='text'
							placeholder=' edit here'
							style={{ marginLeft: "10rem" }}
							value={value}
							onChange={(event) => setValue(event.target.value)}
						></input> */}

						<InputGroup>
							<InputLeftElement
								pointerEvents='none'
								children={<EditIcon color='blue.300' />}

							/>
							<Input type='text'
								placeholder=' edit here'
								// style={{ marginLeft: "10rem" }}
								value={value}
								isInvalid
								errorBorderColor='blue.300'
								focusBorderColor='blue.600'
								onChange={(event) => setValue(event.target.value)} />
						</InputGroup>

						{/* <input placeholder='EDIT'  ></input> */}
						<button type='submit' className='btn btn-primary' style={{ marginLeft: "2rem" }}>Update</button>


					</form>

				</span>
				<button onClick={handleDeleteClick} className='btn btn-danger'>Delete</button>
			</div>
		</li>

	);
};

export default TodoItem;
