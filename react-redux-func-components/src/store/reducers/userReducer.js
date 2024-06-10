import { handleActions } from "redux-actions";
import { actionSuccessType } from "../actions/actionTypes";

const userReducer = handleActions(
    {
        [actionSuccessType.REGISTER_USER_SUCCESS]: (state, { payload }) => {
            return {
                id: payload.id,
                email: payload.email,
                fullName: payload.fullName,
                username: payload.username,
            };
        },

        [actionSuccessType.LOGIN_USER_SUCCESS]: (state, { payload }) => {
            return {
                id: payload.id,
                email: payload.email,
                fullName: payload.fullName,
                username: payload.username,
            };
        },

        [actionSuccessType.LOGOUT_USER_SUCCESS]: (state) => {
            return null;
        },
    },
    null,
);

export default userReducer;
