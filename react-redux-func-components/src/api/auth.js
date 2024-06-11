import { postRequest } from "./helpers";

// api-call (401)
const url = process.env.REACT_APP_BACKEND_URL;

const registerUser = async (credentials) => {
    const response = await postRequest(`${url}auth/register`, credentials);
    return response.data;
};

const loginUser = async (credentials) => {
    const response = await postRequest(`${url}auth/login`, credentials);
    console.log("Reponse: ", response);

    return response.data;
};

export { registerUser, loginUser };
