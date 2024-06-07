import { all } from "redux-saga/effects";
import todosSagas from "./todosSagas";
import filtersSagas from "./filterSagas";
import userSagas from "./userSagas";

export default function* rootSaga() {
    yield all([todosSagas(), filtersSagas(), userSagas()]);
}
