import { createSlice } from '@reduxjs/toolkit';
import { sortData } from './todoMethods';

const initialState = {
	todos: [],
	copyTodos: [],
};

export const todoSlice = createSlice({
	name: 'todo',
	initialState,
	reducers: {
		addTodo: (state, action) => {
			state.todos.push(action.payload);
			state.todos = sortData(state.todos)
		},

		setAllTodo: (state, action) => {
			state.todos = state.copyTodos;
		},
		setTodo: (state, action) => {
			state.todos = action.payload.data;
			if (action.payload.isFirst) {
				state.copyTodos = action.payload.data;
			}
		},
		updateTodo: (state, action) => {
			state.todos = state.todos.map((todo) => {
				if (todo.id === action.payload.id) {
					return action.payload;
				}
				return todo;
			})
			state.todos = sortData(state.todos)
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

export const { addTodo, setTodo, updateTodo, deleteTodo, checkTodo, setAllTodo } = todoSlice.actions;

export default todoSlice.reducer;