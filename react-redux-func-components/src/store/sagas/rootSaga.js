import { all } from "redux-saga/effects";
import todosSagas from "./todosSagas";
import filtersSagas from "./filterSagas";

export default function* rootSaga() {
    yield all([todosSagas(), filtersSagas()]);
}
