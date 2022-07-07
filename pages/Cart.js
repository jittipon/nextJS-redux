import { useSelector, useDispatch } from 'react-redux';
import React, {useEffect} from 'react';
import { getTodoAsync } from '../redux/todoSlice';
import TodoItem from '../components/TodoItem';



export default function Cart() {

  const todos = useSelector((state) => state.todos);

	const dispatch = useDispatch();


	useEffect(() => {

		dispatch(getTodoAsync());


	}, [dispatch]);


  return (
    <div>
      <h1>Your Cart</h1>
      {todos.map((todo) => (
				<TodoItem id={todo.id} title={todo.title} completed={todo.completed} />
			))}
    </div>
  )
}
