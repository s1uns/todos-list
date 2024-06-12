import axios from "axios";
import { postRequest, getRequest, putRequest, deleteRequest } from "./helpers";

axios.defaults.withCredentials = true;
const url = process.env.REACT_APP_BACKEND_URL;

const createTodo = async (title) => {
    const response = await postRequest(`${url}todos/create`, {
        title: title,
    });

    return response;
};

const getTodos = async () => {
    const response = await getRequest(`${url}todos/`);

    return response;
};

const clearCompleted = async () => {
    const response = await getRequest(`${url}todos/clear-completed`);

    return response;
};

const updateTodo = async (todoId, newTitle) => {
    const response = await putRequest(`${url}todos/update`, {
        id: todoId,
        newTitle: newTitle,
    });

    return response;
};

const deleteTodo = async (todoId) => {
    const response = await deleteRequest(`${url}todos/delete/${todoId}`);

    return response;
};

const checkTodo = async (todoId) => {
    const response = await getRequest(`${url}todos/check/${todoId}`);

    return response;
};

export {
    checkTodo,
    clearCompleted,
    createTodo,
    deleteTodo,
    getTodos,
    updateTodo,
};
