import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	todos: [],
};

export const todoSlice = createSlice({
	name: 'todo',
	initialState,
	reducers: {
		addTodo: (state, action) => {
			state.todos.push(action.payload);
		},

		setTodo: (state, action) => {
			state.todos = action.payload;
		},
		updateTodo: (state, action) => {
			state.todos = state.todos.map((todo) => {
				if (todo.id === action.payload.id) {
					return action.payload;
				}
				return todo;
			})
		},
		deleteTodo: (state, action) => {
			state.todos = state.todos.filter((todo) => todo.id !== action.payload);
		},

		checkTodo: (state, action) => {
			state.todos = state.todos.map((todo) => {
				if (todo.id === action.payload.id) {
					return {
						...todo,
						isCompleted: !todo.isCompleted,
					};
				}
				return todo;
			});
		},
	},
})

export const { addTodo, setTodo, updateTodo, deleteTodo, checkTodo } = todoSlice.actions;

export default todoSlice.reducer;