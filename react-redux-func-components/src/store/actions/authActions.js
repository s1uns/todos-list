import { actionRequestType } from "./constants";
import { actionSuccessType } from "./constants";

const registerUserRequest = (payload) => ({
    type: actionRequestType.REGISTER_USER_REQUEST,
    payload: payload,
});

const registerUserSuccess = (payload) => ({
    type: actionSuccessType.REGISTER_USER_SUCCESS,
    payload: payload,
});

const loginUserRequest = (payload) => ({
    type: actionRequestType.LOGIN_USER_REQUEST,
    payload: payload,
});

const loginUserSuccess = (payload) => ({
    type: actionSuccessType.LOGIN_USER_SUCCESS,
    payload: payload,
});

const logoutUserRequest = (payload) => ({
    type: actionRequestType.LOGOUT_USER_REQUEST,
    payload: payload,
});

const logoutUserSuccess = (payload) => ({
    type: actionSuccessType.LOGOUT_USER_SUCCESS,
    payload: payload,
});

export {
    loginUserRequest,
    loginUserSuccess,
    registerUserRequest,
    registerUserSuccess,
    logoutUserRequest,
    logoutUserSuccess,
};
