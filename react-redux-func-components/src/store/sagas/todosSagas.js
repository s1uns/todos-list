import { takeEvery, put, call } from "redux-saga/effects";
import { actionRequestType } from "../actions/constants";
import {
    checkTodo,
    clearCompleted,
    createTodo,
    deleteTodo,
    getTodos,
    updateTodo,
} from "../../api";
import {
    checkTodoSuccess,
    createTodoSuccess,
    deleteTodoSuccess,
    editTodoSuccess,
    setTodosSuccess,
} from "../actions/todosActions";
import { addToastRequest } from "../actions/toastsActions";
import socket from "../../notifications/socket";

function* workGetTodos({ payload }) {
    const { currentPage, currentFilter } = payload;
    const response = yield call(() => getTodos(currentPage, currentFilter));

    if (response.success) {
        yield put(setTodosSuccess({ ...response.data, currentPage }));
    } else {
        yield put(
            addToastRequest({
                id: new Date(Date.now()),
                message: response.message,
            }),
        );
    }
}

function* workAddTodo({ payload }) {
    const response = yield call(() =>
        createTodo({ title: payload.title, socketId: socket.id }),
    );
    const newTodo = response.data;

    if (response.success) {
        yield put(
            createTodoSuccess({
                author: payload.author,
                ...newTodo,
            }),
        );
    } else {
        yield put(
            addToastRequest({
                id: new Date(Date.now()),
                message: response.message,
            }),
        );
    }
}

function* workDeleteTodo({ payload }) {
    const response = yield call(() => deleteTodo(payload, socket.id));

    if (response.success) {
        yield put(deleteTodoSuccess(payload));
    } else {
        yield put(
            addToastRequest({
                id: new Date(Date.now()),
                message: response.message,
            }),
        );
    }
}

function* workCheckTodo({ payload }) {
    const response = yield call(() => checkTodo(payload, socket.id));

    if (response.success) {
        yield put(checkTodoSuccess(response.data));
    } else {
        yield put(
            addToastRequest({
                id: new Date(Date.now()),
                message: response.message,
            }),
        );
    }
}

function* workEditTodo({ payload }) {
    const { id, title } = payload;

    const response = yield call(() => updateTodo(id, title, socket.id));

    if (response.success) {
        yield put(editTodoSuccess(response.data));
    } else {
        yield put(
            addToastRequest({
                id: new Date(Date.now()),
                message: response.message,
            }),
        );
    }
}

function* workClearCompleted() {
    const response = yield call(() => clearCompleted());
    if (response.success) {
        yield put(setTodosSuccess(response.data));
    } else {
        yield put(
            addToastRequest({
                id: new Date(Date.now()),
                message: response.message,
            }),
        );
    }
}

function* todosSagas() {
    yield takeEvery(actionRequestType.ADD_TODO_REQUEST, workAddTodo);
    yield takeEvery(actionRequestType.GET_TODOS_REQUEST, workGetTodos);
    yield takeEvery(actionRequestType.DELETE_TODO_REQUEST, workDeleteTodo);
    yield takeEvery(actionRequestType.CHECK_TODO_REQUEST, workCheckTodo);
    yield takeEvery(actionRequestType.EDIT_TODO_REQUEST, workEditTodo);
    yield takeEvery(
        actionRequestType.CLEAR_COMPLETED_REQUEST,
        workClearCompleted,
    );
}

export default todosSagas;
