import { all } from "redux-saga/effects";
import todosSagas from "./todosSagas";
import filtersSagas from "./filterSagas";
import userSagas from "./userSagas";
import toastsSagas from "./toastsSagas";

export default function* rootSaga() {
    yield all([todosSagas(), filtersSagas(), userSagas(), toastsSagas()]);
}
