import axios from "axios";

axios.defaults.withCredentials = true;
//Logout, api-call (401), validation
const url = process.env.REACT_APP_BACKEND_URL;

const registerUser = async (credentials) => {
    try {
        const response = await axios.post(`${url}auth/register`, credentials);
        return response;
    } catch (err) {
        if (err.response) {
            alert(err.response.data.message);
        }
        return null;
    }
};

const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${url}auth/login`, credentials);
        return response;
    } catch (err) {
        if (err.response) {
            alert(err.response.data.message);
        }
        return null;
    }
};

export { registerUser, loginUser };
