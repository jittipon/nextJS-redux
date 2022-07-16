import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { getTodoAsync } from '../redux/todoSlice';
import TodoItem from '../components/Todo/TodoItem';
import Link from 'next/link';



export default function Result() {

  const todos = useSelector((state) => state.todos);

  const dispatch = useDispatch();

  return (
    <div style={{ textAlign: "center" }}>
      <h1 style={{ marginTop: "10rem",fontSize:"3rem" }}>Your Result</h1>
      <Link href="/" >
        <a style={{color:"red",fontSize:"1.5rem"}}>GO back</a>
      </Link>
      <div style={{marginTop:"5rem"}}>
        {todos.map((todo) => (
          <ul>
            <li>{todo.title}</li>
          </ul>
        ))}

      </div>
    </div>
  )
}
