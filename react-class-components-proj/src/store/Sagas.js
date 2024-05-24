import { v4 as uuid } from "uuid";
import { eventEmitter } from "./EventEmitter";
import { actionType } from "./ActionTypes";

export const getTodos = () => {
    return eventEmitter.emit(actionType.GET_TODOS);
};

export const getFilter = () => {
    return eventEmitter.emit(actionType.GET_FILTER);
};

export const addTodo = (addTodoAction) => {
    addTodoAction.payload.id = uuid();
    eventEmitter.emit(actionType.ADD_TODO, addTodoAction.payload);
};

export const deleteTodo = (deleteTodoAction) => {
    eventEmitter.emit(actionType.DELETE_TODO, deleteTodoAction.payload.id);
};

export const checkTodo = (checkTodoAction) => {
    eventEmitter.emit(actionType.CHECK_TODO, checkTodoAction.payload.id);
};

export const editTodo = (editTodoAction) => {
    eventEmitter.emit(actionType.EDIT_TODO, editTodoAction.payload);
};

export const setFilter = (setTodoAction) => {
    return eventEmitter.emit(actionType.SET_FILTER, setTodoAction.payload);
};
