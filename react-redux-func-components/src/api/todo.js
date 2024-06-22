import axios from "axios";
import { customRequest } from "./helpers";
import {
    GET_REQUEST,
    PATCH_REQUEST,
    POST_REQUEST,
    PUT_REQUEST,
    DELETE_REQUEST,
} from "../shared/constants";

axios.defaults.withCredentials = true;
const url = process.env.REACT_APP_BACKEND_URL;

const createTodo = async (title) => {
    const response = await customRequest(POST_REQUEST, `${url}todos`, {
        title: title,
    });

    return response;
};

const getTodos = async (currentPage, limit) => {
    const response = await customRequest(
        GET_REQUEST,
        `${url}todos?page=${currentPage}&limit=${limit}`,
    );

    return response;
};

const clearCompleted = async () => {
    const response = await customRequest(
        PATCH_REQUEST,
        `${url}todos/clear-completed`,
    );

    return response;
};

const updateTodo = async (todoId, newTitle) => {
    const response = await customRequest(PUT_REQUEST, `${url}todos`, {
        id: todoId,
        newTitle: newTitle,
    });

    return response;
};

const deleteTodo = async (todoId) => {
    const response = await customRequest(
        DELETE_REQUEST,
        `${url}todos/${todoId}`,
    );

    return response;
};

const checkTodo = async (todoId) => {
    const response = await customRequest(
        PATCH_REQUEST,
        `${url}todos/${todoId}/check`,
    );

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
