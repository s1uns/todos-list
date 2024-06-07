import { handleActions } from "redux-actions";
import { actionSuccessType } from "../actions/actionTypes";

const userReducer = handleActions(
    {
        [actionSuccessType.REGISTER_USER_SUCCESS]: (
            oldUser = {
                id: null,
                email: null,
                fullName: null,
                username: null,
            },
            { payload },
        ) => {
            console.log("Payload: ", payload);
            return {
                id: payload.id,
                email: payload.email,
                fullName: payload.fullName,
                username: payload.username,
            };
        },
    },
    {
        id: null,
        email: null,
        fullName: null,
        username: null,
    },
);

export default userReducer;
