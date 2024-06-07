import { takeEvery, put } from "redux-saga/effects";
import { actionRequestType, actionSuccessType } from "../actions/actionTypes";
import { registerUser } from "../../api/auth";
import Cookies from "js-cookie";

function* workRegisterUser({ payload }) {
     registerUser(payload).then((response) => {
        if (response) {
            console.log("Response: ", response.data.data);
            const { id, email, fullName, username, bearer } =
                response.data.data;
            Cookies.set("bearer", bearer, { expires: 7, secure: true });
            
            put({
                type: actionSuccessType.REGISTER_USER_SUCCESS,
                payload: { id, email, fullName, username },
            });
        }
    });
}

function* userSagas() {
    yield takeEvery(actionRequestType.REGISTER_USER_REQUEST, workRegisterUser);
}

export default userSagas;
