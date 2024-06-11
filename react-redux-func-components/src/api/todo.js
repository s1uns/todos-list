import axios from "axios";

axios.defaults.withCredentials = true;
const url = process.env.REACT_APP_BACKEND_URL;

const createTodo = async (title) => {
    try {
        const response = await axios.post(`${url}todos/create`, {
            title: title,
        });
        return response.data;
    } catch (err) {
        console.log(err.message);
        return err.response.data;
    }
};

export { createTodo };
