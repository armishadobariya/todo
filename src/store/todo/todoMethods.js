import axios from 'axios';
import { getTaskUrl, insertTaskUrl, updateTaskUrl, deleteTaskUrl, checkBoxUrl, searchTaskUrl } from '../../auth/Api';
import { addTodo, setTodo, updateTodo, deleteTodo, checkTodo, setAllTodo } from './todoSlice';

export const sortData = (data) => {
	const compareDates = (a, b) => new Date(b.date) - new Date(a.date);
	const sortedData = data.sort(compareDates);
	return sortedData;
}


export const addTodoData = (todoData) => async (dispatch) => {
	try {
		const formData = new FormData();

		formData.append('image', todoData.image);
		formData.append('title', todoData.title);
		formData.append('description', todoData.description);
		formData.append('date', todoData.date);



		const token = localStorage.getItem('token');

		const response = await axios.post(insertTaskUrl, formData, {
			headers: {
				authorization: `Bearer ${token}`,
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
				authorization: `Bearer ${token}`,
			},
		});

		if (response.status === 200) {
			dispatch(setTodo({ data: response.data.data, isFirst: true }));
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
				authorization: `Bearer ${token}`,
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


export const checkTodoData = ({ taskId, isCompleted }) => async (dispatch) => {
	try {
		const token = localStorage.getItem("token");

		dispatch(checkTodo({ id: taskId, isCompleted: !isCompleted }));
		const checkdata = {
			id: taskId,
			isCompleted: !isCompleted,
		};
		const response = await axios.put(checkBoxUrl, checkdata, {
			headers: {
				authorization: `Bearer ${token}`,
			},
		});
		console.log('Checkbox API Response:', response.data);
	} catch (error) {
		console.error('Error updating checkbox:', error.message);
	}
};

export const searchTodoData = ({ search }) => async (dispatch) => {
	if (search === undefined || search === null || search === "") {
		dispatch(setAllTodo())
		return;
	}
	try {
		const token = localStorage.getItem("token")
		const response = await axios.get(`${searchTaskUrl}/${search}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		if (response.status === 200) {
			dispatch(setTodo({ data: response.data.data, isFirst: false }));

		}
	} catch (error) {
		console.error("No Data Search", error.message);
	}
}

export const deleteTodoData = ({ taskId, token }) => async (dispatch) => {
	try {
		const response = await axios.delete(deleteTaskUrl, {
			headers: {
				Authorization: `Bearer ${token}`,
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

