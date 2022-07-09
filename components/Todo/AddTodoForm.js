import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodoAsync } from '../../redux/todoSlice';
import toast from 'react-hot-toast';

var regexp = /\s/g

const AddTodoForm = () => {
	const [value, setValue] = useState('');

	const dispatch = useDispatch();

	const onSubmit = (event) => {

		event.preventDefault();
		console.log('user entered: ' + value);

		if(value.length == 0 ) {
			toast.error('Please enter a todo item');
		}
		else {
			dispatch(
				addTodoAsync({
					title: value,
				})
			);
			setValue('');
			toast.success('add! ' + value);
		}

	};

	return (
		<form onSubmit={onSubmit} className='form-inline mt-3 mb-3'>
			<label className='sr-only'>Name</label>
			<input
				type='text'
				className='form-control mb-2 w-25'
				placeholder='Add todo...'
				value={value}
				onChange={(event) => setValue(event.target.value)}
			></input>

			<button type='submit' className='btn btn-primary mb-2'>
				Submit
			</button>
		</form>
	);
};



export default AddTodoForm;

