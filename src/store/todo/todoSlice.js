import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    todos: [],
};

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodoSuccess: (state, action) => {
            state.todos.push(action.payload);
        },
        setTodos: (state, action) => {
            state.todos = action.payload;
        },
        updateTodos: (state, action) => {
            state.todos = state.todos.map((todo) => {
                if (todo.id === action.payload.id) {
                    console.log(action.payload);
                    return action.payload
                }
                return todo
            })
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter((todo)=> todo.id !== action.payload)
        }
    },
});

export const { addTodoSuccess, setTodos, updateTodos, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;