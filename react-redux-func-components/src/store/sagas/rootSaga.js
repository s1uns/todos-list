import { all } from "redux-saga/effects";
import notificationsSagas from "./notificationsSagas";
import querySagas from "./querySagas";
import toastsSagas from "./toastsSagas";
import todosSagas from "./todosSagas";
import userSagas from "./userSagas";

export default function* rootSaga() {
	yield all([
		todosSagas(),
		querySagas(),
		userSagas(),
		toastsSagas(),
		notificationsSagas(),
	]);
}
