import axios from "axios";
import { customRequest } from "./helpers";
import {
    GET_REQUEST,
    PATCH_REQUEST,
    POST_REQUEST,
    PUT_REQUEST,
    DELETE_REQUEST,
    TODOS_LIMIT,
} from "../shared/constants";

axios.defaults.withCredentials = true;
const url = process.env.REACT_APP_BACKEND_URL;

const createTodo = async ({ title, socketId }) => {
    const response = await customRequest(POST_REQUEST, `${url}todos`, {
        title: title,
        socketId: socketId,
    });

    return response;
};

const getTodos = async (currentPage, currentFilter) => {
    const response = await customRequest(
        GET_REQUEST,
        `${url}todos?page=${currentPage}&limit=${TODOS_LIMIT}&filter=${currentFilter}`,
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

const updateTodo = async (todoId, newTitle, socketId) => {
    const response = await customRequest(PUT_REQUEST, `${url}todos`, {
        id: todoId,
        newTitle: newTitle,
        socketId: socketId,
    });

    return response;
};

const deleteTodo = async (todoId, socketId) => {
    const response = await customRequest(
        DELETE_REQUEST,
        `${url}todos/${todoId}`,
        { socketId: socketId },
    );

    return response;
};

const checkTodo = async (todoId, socketId) => {
    const response = await customRequest(
        PATCH_REQUEST,
        `${url}todos/${todoId}/check`,
        { socketId: socketId },
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
