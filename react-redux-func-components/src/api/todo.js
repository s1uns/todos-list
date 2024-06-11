import axios from "axios";
import { postRequest } from "./helpers";

axios.defaults.withCredentials = true;
const url = process.env.REACT_APP_BACKEND_URL;

const createTodo = async (title) => {
    const response = await postRequest(`${url}todos/create`, {
        title: title,
    });

    return response;
};

export { createTodo };
