import { takeEvery, put, call } from "redux-saga/effects";
import { actionRequestType, actionSuccessType } from "../actions/constants";
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
import { addNotificationRequest } from "../actions/notificationsActions";

function* workGetTodos({ payload }) {
    const { currentPage, limit } = payload;
    const response = yield call(() => getTodos(currentPage, limit));

    if (response.success) {
        yield put(setTodosSuccess(response.data));
    } else {
        yield put(
            addNotificationRequest({
                id: new Date(Date.now()),
                message: response.message,
            }),
        );
    }
}

function* workAddTodo({ payload }) {
    const response = yield call(() => createTodo(payload));
    const newTodo = response.data;

    if (response.success) {
        yield put(createTodoSuccess({ ...newTodo, isAuthor: true }));
    } else {
        yield put(
            addNotificationRequest({
                id: new Date(Date.now()),
                message: response.message,
            }),
        );
    }
}

function* workDeleteTodo({ payload }) {
    const response = yield call(() => deleteTodo(payload.id));

    if (response.success) {
        yield put(deleteTodoSuccess(payload));
    } else {
        yield put(
            addNotificationRequest({
                id: new Date(Date.now()),
                message: response.message,
            }),
        );
    }
}

function* workCheckTodo({ payload }) {
    const response = yield call(() => checkTodo(payload));

    if (response.success) {
        yield put(checkTodoSuccess(response.data));
    } else {
        yield put(
            addNotificationRequest({
                id: new Date(Date.now()),
                message: response.message,
            }),
        );
    }
}

function* workEditTodo({ payload }) {
    const { id, title } = payload;

    const response = yield call(() => updateTodo(id, title));

    if (response.success) {
        yield put(editTodoSuccess(response.data));
    } else {
        yield put(
            addNotificationRequest({
                id: new Date(Date.now()),
                message: response.message,
            }),
        );
    }
}

function* workClearCompleted() {
    const response = yield call(() => clearCompleted()); //needs to be fixed
    if (response.success) {
        yield put(setTodosSuccess(response.data));
    } else {
        yield put(
            addNotificationRequest({
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
