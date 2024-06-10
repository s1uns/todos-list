import axios from "axios";

const url = process.env.REACT_APP_BACKEND_URL;

// axios.defaults.withCredentials = true;

const registerUser = async (credentials) => {
    try {
        const response = await axios.post(`${url}auth/register`, credentials);
        return response;
    } catch (err) {
        if (err.response) {
            alert(err.response.data.message);
        }
        throw new Error("Failed to register new user.");
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
        throw new Error("Failed to login.");
    }
};

export { registerUser, loginUser };
