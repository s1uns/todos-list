import { postRequest, getRequest } from "./helpers";

const url = process.env.REACT_APP_BACKEND_URL;

const registerUser = async (credentials) => {
    const response = await postRequest(`${url}auth/registration`, credentials);
    return response;
};

const loginUser = async (credentials) => {
    const response = await postRequest(`${url}auth/login`, credentials);

    return response;
};

const logoutUser = async () => {
    const response = await postRequest(`${url}auth/logout`);
    return response;
};

export { registerUser, loginUser, logoutUser };
