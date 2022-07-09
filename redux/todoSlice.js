import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getTodoAsync = createAsyncThunk(
    'todos/getTodoAsync',
    async () => {
        const response = await fetch('http://localhost:7000/todos');
        if(response.ok){
            const todos = await response.json();
            console.log(todos);

            return {todos};

        }
    }

)

export const getTodoAsyncByID = createAsyncThunk(
    'todos/getTodoAsyncByID',
    async (payload) => {
        const response = await fetch(`http://localhost:7000/todos/${payload.title}`);
        if(response.ok){
            const todos = await response.json();
            console.log("success req");
            console.log(todos);
            return {todos};

        } else {
            console.log("false req");
        }
    }

)

export const addTodoAsync = createAsyncThunk(
	'todos/addTodoAsync',
	async (payload) => {
		const resp = await fetch('http://localhost:7000/todos', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ title: payload.title }),
		});

		if (resp.ok) {
			const todo = await resp.json();
			return { todo };
		}
	}
);

export const deleteTodoAsync = createAsyncThunk(
    'todos/deleteTodoAsync',
    async(payload) => {
        const response = await fetch(`http://localhost:7000/todos/${payload.id}`, {
            method: 'DELETE',
    });

    if(response.ok)
    {
        // const todo = await response.json();
        return {id: payload.id};
    }


    }

)

export const toggleCompleteAsync = createAsyncThunk(
    'todos/CompleteTodoAsync',
    async(payload) => {
        const response = await fetch(`http://localhost:7000/todos/${payload.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ completed: payload.completed }),
    });

    if(response.ok)
    {
        const todo = await response.json();
        return { id: todo.id, completed: todo.completed };
    }

    }

)

export const editTodoAsync = createAsyncThunk(
    'todos/editTodoAsync',
    async(payload) => {
        const response = await fetch(`http://localhost:7000/todos/${payload.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: payload.title }),
    });

    if(response.ok)
    {
        const todo = await response.json();
        return { id: todo.id, title: todo.title };
    }


    }


)

const todoSlice = createSlice({

    name: "todos",
    initialState: [
        // {
        //     id: 1,
        //     title: "todo1",
        //     completed: false
        // },
        // {
        //     id: 2,
        //     title: "todo2",
        //     completed: false
        // },
        // {
        //     id: 3,
        //     title: "todo3",
        //     completed: true
        // },
    ],
    reducers: {
        // addTodo: (state, action) => {
        //     const newTodo ={
        //         id: Date.now(),
        //         title: action.payload.title,
        //         completed: false
        //     };

        //     state.push(newTodo);
        // },
        // toggleComplete: (state, action) => {
        //      const index = state.findIndex(
        //         (todo) => todo.id === action.payload.id
        //      );
        // state[index].completed = action.payload.completed;

        // },
        // deleteTodo: (state, action) => {
        //     return state.filter((todo) => todo.id !== action.payload.id);

        // },
        // editTodo: (state, action) => {
        //     const index = state.findIndex(
        //         (todo) => todo.id === action.payload.id
        //     );
        // state[index].title = action.payload.title;

        // }
    },

    extraReducers: {
        [getTodoAsync.pending]: (state, action) => {
            console.log('fecthing todos....');
        },
        [getTodoAsync.fulfilled]: (state, action) => {
            console.log('fecthing successfully!');
            console.log(action.payload.todos);

            return  action.payload.todos;

        },
        [getTodoAsyncByID.pending]: (state, action) => {
            console.log('searching todos....');
        },
        [getTodoAsyncByID.fulfilled]: (state, action) => {
            console.log('searching successfully!');
            console.log(action.payload.todo);
            return  action.payload.todos;

        },
        [addTodoAsync.fulfilled]: (state, action) => {
            state.push(action.payload.todo); 
        },
        [toggleCompleteAsync.fulfilled]: (state, action) => {
            const index = state.findIndex(
                (todo) => todo.id === action.payload.id
            );
            state[index].completed = action.payload.completed;
        },
        [deleteTodoAsync.fulfilled]: (state, action) => {
            return state.filter((todo) => todo.id !== action.payload.id);
            // state =  action.payload.todos;
        },
        [editTodoAsync.fulfilled]: (state, action) => {
            const index = state.findIndex(
                (todo) => todo.id === action.payload.id
            );
            state[index].title = action.payload.title;
        }
    }
    
});

export const { addTodo, toggleComplete, deleteTodo, editTodo } = todoSlice.actions;

export default todoSlice.reducer;