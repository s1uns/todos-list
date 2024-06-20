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
import { setFilterSuccess } from "../actions/filterActions";

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
            })
        );
    }
}

function* workLoginUser({ payload }) {
    const response = yield call(() => loginUser(payload));

    if (response.success) {
        const { id, email, fullName, username } = response.data;

        yield put(loginUserSuccess({ id, email, fullName, username }));
    } else {
        yield put(
            addNotificationRequest({
                id: new Date(Date.now()),
                message: response.message,
            })
        );
    }
}

function* workLogoutUser() {
    yield call(() => logoutUser());

    yield put(clearTodosSuccess());

    yield put(setFilterSuccess("all"));

    yield put(logoutUserSuccess());
}

function* userSagas() {
    yield takeEvery(actionRequestType.REGISTER_USER_REQUEST, workRegisterUser);
    yield takeEvery(actionRequestType.LOGIN_USER_REQUEST, workLoginUser);
    yield takeEvery(actionRequestType.LOGOUT_USER_REQUEST, workLogoutUser);
}

export default userSagas;
