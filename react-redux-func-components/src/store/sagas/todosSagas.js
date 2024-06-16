import { takeEvery, put, call } from "redux-saga/effects";
import { actionRequestType, actionSuccessType } from "../actions/actionTypes";
import {
    checkTodo,
    clearCompleted,
    createTodo,
    deleteTodo,
    getTodos,
    updateTodo,
} from "../../api";

function* workGetTodos() {
    const response = yield call(() => getTodos());

    if (response.success) {
        yield put({
            type: actionSuccessType.SET_TODOS_SUCCESS,
            payload: response.data,
        });
    } else {
        yield put({
            type: actionRequestType.ADD_NOTIFICATION_REQUEST,
            payload: { id: new Date(Date.now()), message: response.message },
        });
    }
}

function* workAddTodo({ payload }) {
    const response = yield call(() => createTodo(payload));
    const newTodo = response.data;

    if (response.success) {
        yield put({
            type: actionSuccessType.ADD_TODO_SUCCESS,
            payload: newTodo,
        });
    } else {
        yield put({
            type: actionRequestType.ADD_NOTIFICATION_REQUEST,
            payload: { id: new Date(Date.now()), message: response.message },
        });
    }
}

function* workDeleteTodo({ payload }) {
    const response = yield call(() => deleteTodo(payload));

    if (response.success) {
        yield put({
            type: actionSuccessType.DELETE_TODO_SUCCESS,
            payload: payload,
        });
    } else {
        yield put({
            type: actionRequestType.ADD_NOTIFICATION_REQUEST,
            payload: { id: new Date(Date.now()), message: response.message },
        });
    }
}

function* workCheckTodo({ payload }) {
    const response = yield call(() => checkTodo(payload));

    if (response.success) {
        yield put({
            type: actionSuccessType.CHECK_TODO_SUCCESS,
            payload: response.data,
        });
    } else {
        yield put({
            type: actionRequestType.ADD_NOTIFICATION_REQUEST,
            payload: { id: new Date(Date.now()), message: response.message },
        });
    }
}

function* workEditTodo({ payload }) {
    const { id, title } = payload;
    
    const response = yield call(() => updateTodo(id, title));

    if (response.success) {
        yield put({
            type: actionSuccessType.EDIT_TODO_SUCCESS,
            payload: response.data,
        });
    } else {
        yield put({
            type: actionRequestType.ADD_NOTIFICATION_REQUEST,
            payload: { id: new Date(Date.now()), message: response.message },
        });
    }
}

function* workClearCompleted() {
    const response = yield call(() => clearCompleted());

    if (response.success) {
        yield put({
            type: actionSuccessType.SET_TODOS_SUCCESS,
            payload: response.data,
        });
    } else {
        yield put({
            type: actionRequestType.ADD_NOTIFICATION_REQUEST,
            payload: { id: new Date(Date.now()), message: response.message },
        });
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
