import { takeEvery, put } from "redux-saga/effects";
import { actionRequestType, actionSuccessType } from "../actions/constants";
import { setFilterSuccess } from "../actions/filterActions";

function* workSetFilter({ payload }) {
    yield put(setFilterSuccess(payload));
}

function* filtersSagas() {
    yield takeEvery(actionRequestType.SET_FILTER_REQUEST, workSetFilter);
}

export default filtersSagas;
