import { takeEvery, put } from "redux-saga/effects";
import { actionRequestType } from "../actions/constants";
import { setQuerySuccess } from "../actions/queryActions";

function* workSetQuery({ payload }) {
    yield put(setQuerySuccess(payload));
}

function* querySagas() {
    yield takeEvery(actionRequestType.SET_QUERY_REQUEST, workSetQuery);
}

export default querySagas;
