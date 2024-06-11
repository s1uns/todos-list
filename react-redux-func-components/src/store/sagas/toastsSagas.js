import { takeEvery, put, call } from "redux-saga/effects";
import { actionRequestType, actionSuccessType } from "../actions/actionTypes";

function* workAddNotification({ payload }) {
    yield put({
        type: actionSuccessType.ADD_NOTIFICATION_SUCCESS,
        payload: payload,
    });
}

function* workDismissNotification({ payload }) {
    console.log("Payload: ", payload);
    yield put({
        type: actionSuccessType.DISMISS_NOTIFICATION_SUCCESS,
        payload: payload,
    });
}

function* toastsSagas() {
    yield takeEvery(
        actionRequestType.ADD_NOTIFICATION_REQUEST,
        workAddNotification,
    );
    yield takeEvery(
        actionRequestType.DISMISS_NOTIFICATION_REQUEST,
        workDismissNotification,
    );
}

export default toastsSagas;
