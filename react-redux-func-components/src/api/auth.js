import { customRequest } from "./helpers";
import { POST_REQUEST } from "../shared/constants";

const url = process.env.REACT_APP_BACKEND_URL;

const registerUser = async (credentials) => {
    const response = await customRequest(
        POST_REQUEST,
        `${url}auth/registration`,
        credentials,
    );
    return response;
};

const loginUser = async (credentials) => {
    const response = await customRequest(
        POST_REQUEST,
        `${url}auth/login`,
        credentials,
    );

    return response;
};

const logoutUser = async () => {
    const response = await customRequest(POST_REQUEST, `${url}auth/logout`);
    return response;
};

export { registerUser, loginUser, logoutUser };
