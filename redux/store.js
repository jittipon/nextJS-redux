import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";
import counterReducer from "./counterSlice";

export default configureStore({

    reducer: {
        todos: todoReducer,
        counter: counterReducer,
    },


})


