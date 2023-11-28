import axios from 'axios';
import { getTaskUrl, insertTaskUrl, updateTaskUrl, deleteTaskUrl } from '../../auth/Api';
import { addTodoSuccess, setTodos , updateTodos, deleteTodo } from './todoSlice';

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
            dispatch(addTodoSuccess(response.data.data));
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
            dispatch(setTodos(response.data.data));
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
            dispatch(updateTodos(data));
        }

    } catch (error) {
        console.error("Error updating task:", error.message);
    }
}

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