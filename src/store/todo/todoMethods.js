import axios from 'axios';
import { getTaskUrl, insertTaskUrl, updateTaskUrl, deleteTaskUrl, checkBoxUrl } from '../../auth/Api';
import { addTodo, setTodo, updateTodo, deleteTodo, checkTodo } from './todoSlice';

export const addTodoData = (todoData) => async (dispatch) => {
	try {
		const formData = new FormData();

		formData.append('image', todoData.image);
		formData.append('title', todoData.title);
		formData.append('description', todoData.description);

		const token = localStorage.getItem('token');

		const response = await axios.post(insertTaskUrl, formData, {
			headers: {
				authorization: token,
			},
		});

		if (response.status === 201) {
			dispatch(addTodo(response.data.data));
		}
		console.log('Insert Task Response:', response.data);
	} catch (error) {
		console.error('Error:', error.message);
	}
};

export const getTodo = () => async (dispatch) => {
	try {
		const token = localStorage.getItem('token');
		const response = await axios.get(getTaskUrl, {
			headers: {
				authorization: token,
			},
		});

		if (response.status === 200) {
			dispatch(setTodo(response.data.data));
			console.log('Get Task Response:', response.data.data);
		}
	} catch (error) {
		console.error('Error:', error.message);
	}
};

export const updateTodoData = (todoData) => async (dispatch) => {
	try {
		const token = localStorage.getItem("token");
		const response = await axios.put(updateTaskUrl, todoData, {
			headers: {
				authorization: token,
			},
		});
		console.log("Task updated successfully:", response.data);
		if (response.status === 200) {
			const data = response.data.data;
			dispatch(updateTodo(data));
		}

	} catch (error) {
		console.error("Error updating task:", error.message);
	}
}


export const checkTodoData = ({ taskId, isCompleted }) => async (dispatch, getState) => {
	try {
		const token = localStorage.getItem("token");

		// const currentTodos = getState().todo.todos;
		dispatch(checkTodo({ id: taskId, isCompleted: !isCompleted }));
		const checkdata = {
			id: taskId,
			isCompleted: !isCompleted,
		};
		const response = await axios.put(checkBoxUrl, checkdata, {
			headers: {
				authorization: token,
			},
		});
		console.log('Checkbox API Response:', response.data);
	} catch (error) {
		console.error('Error updating checkbox:', error.message);
	}
};

export const deleteTodoData = ({ taskId, token }) => async (dispatch) => {
	try {
		const response = await axios.delete(deleteTaskUrl, {
			headers: {
				Authorization: token,
			},
			data: {
				id: taskId,
			},
		});
		if (response.status === 200) {
			dispatch(deleteTodo(taskId))
		}
	} catch (error) {
		console.error("Error deleting task:", error.message);
	}
}

