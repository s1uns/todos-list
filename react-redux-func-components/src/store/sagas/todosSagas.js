import { takeEvery, put, call } from "redux-saga/effects";
import { actionRequestType, actionSuccessType } from "../actions/actionTypes";
import { createTodo } from "../../api/todo";

function* workAddTodo({ payload }) {
    const response = yield call(() => createTodo(payload));
    const newTodo = response.data.data;

    if (response) {
        yield put({
            type: actionSuccessType.ADD_TODO_SUCCESS,
            payload: newTodo,
        });
    }
}

function* workDeleteTodo({ payload }) {
    yield put({
        type: actionSuccessType.DELETE_TODO_SUCCESS,
        payload: payload,
    });
}

function* workCheckTodo({ payload }) {
    yield put({ type: actionSuccessType.CHECK_TODO_SUCCESS, payload: payload });
}

function* workEditTodo({ payload }) {
    yield put({ type: actionSuccessType.EDIT_TODO_SUCCESS, payload: payload });
}

function* workClearCompleted() {
    yield put({ type: actionSuccessType.CLEAR_COMPLETED_SUCCESS });
}

function* todosSagas() {
    yield takeEvery(actionRequestType.ADD_TODO_REQUEST, workAddTodo);
    yield takeEvery(actionRequestType.DELETE_TODO_REQUEST, workDeleteTodo);
    yield takeEvery(actionRequestType.CHECK_TODO_REQUEST, workCheckTodo);
    yield takeEvery(actionRequestType.EDIT_TODO_REQUEST, workEditTodo);
    yield takeEvery(
        actionRequestType.CLEAR_COMPLETED_REQUEST,
        workClearCompleted,
    );
}

export default todosSagas;
