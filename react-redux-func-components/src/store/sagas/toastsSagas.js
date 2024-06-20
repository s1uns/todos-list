import { takeEvery, put } from "redux-saga/effects";
import { actionRequestType, actionSuccessType } from "../actions/constants";
import {
    addNotificationSuccess,
    dismissNotificationSuccess,
} from "../actions/notificationsActions";

function* workAddNotification({ payload }) {
    yield put(addNotificationSuccess(payload));
}

function* workDismissNotification({ payload }) {
    yield put(dismissNotificationSuccess(payload));
}

function* toastsSagas() {
    yield takeEvery(
        actionRequestType.ADD_NOTIFICATION_REQUEST,
        workAddNotification
    );
    yield takeEvery(
        actionRequestType.DISMISS_NOTIFICATION_REQUEST,
        workDismissNotification
    );
}

export default toastsSagas;
