import { takeEvery, put } from "redux-saga/effects";
import { actionRequestType, actionSuccessType } from "../actions/actionTypes";

function* workSetFilter({ payload }) {
    yield put({ type: actionSuccessType.SET_FILTER_SUCCESS, payload: payload });
}

function* filtersSagas() {
    yield takeEvery(actionRequestType.SET_FILTER_REQUEST, workSetFilter);
}

export default filtersSagas;
