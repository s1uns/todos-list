import { takeEvery, put, call } from "redux-saga/effects";
import { actionRequestType, actionSuccessType } from "../actions/actionTypes";
import { registerUser, loginUser } from "../../api/auth";

function* workRegisterUser({ payload }) {
    const response = yield call(() => registerUser(payload));
    if (response) {
        const { id, email, fullName, username } = response.data.data;

        yield put({
            type: actionSuccessType.REGISTER_USER_SUCCESS,
            payload: { id, email, fullName, username },
        });
    }
}

function* workLoginUser({ payload }) {
    const response = yield call(() => loginUser(payload));
    if (response) {
        const { id, email, fullName, username } = response.data.data;

        yield put({
            type: actionSuccessType.LOGIN_USER_SUCCESS,
            payload: { id, email, fullName, username },
        });
    }
}

function* userSagas() {
    yield takeEvery(actionRequestType.REGISTER_USER_REQUEST, workRegisterUser);
    yield takeEvery(actionRequestType.LOGIN_USER_REQUEST, workLoginUser);
}

export default userSagas;
