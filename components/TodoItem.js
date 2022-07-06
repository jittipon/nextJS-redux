import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleCompleteAsync , deleteTodoAsync, deleteTodo, editTodo, editTodoAsync } from '../redux/todoSlice';

const TodoItem = ({ id, title, completed }) => {

	const [value, setValue] = useState('');

	const dispatch = useDispatch();

	const handleCompleteClick = () => {

		dispatch(toggleCompleteAsync({id: id, completed: !completed}));

	}
	const handleDeleteClick = () => {

		dispatch(deleteTodoAsync({id: id}));

	}
	const handleEditClick = (e) => {

		e.preventDefault();
		console.log('Edit index: ' + value);


		dispatch(
			editTodoAsync({
				id: id, 
				title: value
			}));

	}
	
	return (
		<li className={`list-group-item ${completed && 'list-group-item-success'}`}>
			<div className='d-flex justify-content-between'>
				<span className='d-flex align-items-center'>
					<input type='checkbox' className='mr-3' checked={completed} onChange={handleCompleteClick}></input>
					{title}

					<form onSubmit={handleEditClick} className='form-inline mt-3 mb-3'>
						<input 
							type='text' 
							placeholder=' edit here' 
							style={{marginLeft:"10rem"}}
							value={value}
							onChange={(event) => setValue(event.target.value)}
						></input>
						{/* <input placeholder='EDIT'  ></input> */}
						<button type='submit' className='btn btn-success' style={{marginLeft:"2rem"}}>Update</button>


					</form>

				</span>
				<button onClick={handleDeleteClick} className='btn btn-danger'>Delete</button>
			</div>
		</li>
	);
};

export default TodoItem;
