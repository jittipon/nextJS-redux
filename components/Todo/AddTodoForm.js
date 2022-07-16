import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodoAsync } from '../../redux/todoSlice';
import toast from 'react-hot-toast';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { AddIcon, } from '@chakra-ui/icons'

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
			toast.success('add! ' + value,
			{
				icon: '👏',
				style: {
				  borderRadius: '10px',
				  background: '#333',
				  color: '#fff',
				},
			  });
		}

	};

	return (
		<form onSubmit={onSubmit} className='form-inline mt-3 mb-3 w-25'>
			{/* <label className='sr-only'>todo</label> */}
			<InputGroup>
              <InputLeftElement
                pointerEvents='none'
                children={<AddIcon color='gray.300' />}

              />
              <Input type='text'
				placeholder='Add todo...'
				value={value}
				onChange={(event) => setValue(event.target.value)} />
            </InputGroup>

			<button type='submit' className='btn btn-success mb-2 mt-2'>
				Submit
			</button>
		</form>
	);
};



export default AddTodoForm;

