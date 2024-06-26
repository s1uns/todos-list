import { takeEvery, put, call } from "redux-saga/effects";
import { actionRequestType } from "../actions/constants";
import { registerUser, loginUser, logoutUser } from "../../api";
import {
    loginUserSuccess,
    registerUserSuccess,
    logoutUserSuccess,
} from "../actions/authActions";
import { addNotificationRequest } from "../actions/notificationsActions";
import { clearTodosSuccess } from "../actions/todosActions";
import { setQuerySuccess } from "../actions/queryActions";
import { FILTER_ALL } from "../../shared/constants";
import socket from "../../sockets/socket";

function* workRegisterUser({ payload }) {
    const response = yield call(() => registerUser(payload));

    if (response.success) {
        const { id, email, fullName, username } = response.data;

        yield put(registerUserSuccess({ id, email, fullName, username }));
    } else {
        yield put(
            addNotificationRequest({
                id: new Date(Date.now()),
                message: response.message,
            }),
        );
    }
}

function* workLoginUser({ payload }) {
    const response = yield call(() => loginUser(payload));

    if (response.success) {
        const { userId, email, fullName, username } = response.data;
        socket.emit("authorization", userId);

        yield put(loginUserSuccess({ userId, email, fullName, username }));
    } else {
        yield put(
            addNotificationRequest({
                id: new Date(Date.now()),
                message: response.message,
            }),
        );
    }
}

function* workLogoutUser() {
    const response = yield call(() => logoutUser());

    if (response.success) {
        yield put(clearTodosSuccess());
        yield put(
            setQuerySuccess({ currentPage: 1, currentFilter: FILTER_ALL }),
        );
        yield put(logoutUserSuccess());
    } else {
        yield put(
            addNotificationRequest({
                id: new Date(Date.now()),
                message: response.message,
            }),
        );
    }
}

function* userSagas() {
    yield takeEvery(actionRequestType.REGISTER_USER_REQUEST, workRegisterUser);
    yield takeEvery(actionRequestType.LOGIN_USER_REQUEST, workLoginUser);
    yield takeEvery(actionRequestType.LOGOUT_USER_REQUEST, workLogoutUser);
}

export default userSagas;
