import axios from "axios";

axios.defaults.withCredentials = true;
//Logout, api-call (401)
const url = process.env.REACT_APP_BACKEND_URL;

const registerUser = async (credentials) => {
    try {
        const response = await axios.post(`${url}auth/register`, credentials);
        return response;
    } catch (err) {
        console.log(err.message);
        return err.response.data;
    }
};

const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${url}auth/login`, credentials);
        return response;
    } catch (err) {
        console.log(err.message);
        return err.response.data;
    }
};

const logoutUser = async () => {
    const response = await axios.get(`${url}auth/logout`);
    return response;
};

export { registerUser, loginUser, logoutUser };
