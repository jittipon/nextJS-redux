import { useSelector, useDispatch } from 'react-redux';
import React, {useEffect} from 'react';
import { getTodoAsync } from '../redux/todoSlice';
import TodoItem from '../components/Todo/TodoItem';
import Link from 'next/link';



export default function Cart() {

  const todos = useSelector((state) => state.todos);

	const dispatch = useDispatch();


	useEffect(() => {

		dispatch(getTodoAsync());


	}, [dispatch]);


  return (
    <div>
      <h1>Your Cart</h1>
      <Link href="/" >
          <a>GO back</a>
        </Link>
      {todos.map((todo) => (
				<TodoItem id={todo.id} title={todo.title} completed={todo.completed} />
			))}
    </div>
  )
}
