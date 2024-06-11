//custom axios.post
import axios from "axios";
// import store from "../store/store";
// import { actionRequestType } from "../store/actions/actionTypes.js";

axios.defaults.withCredentials = true;

const postRequest = async (url, data) => {
    try {
        const response = await axios.post(url, data);
        return response.data;
    } catch (err) {
        console.log(err.message);
        return err.response.data;
    }
};

export default postRequest;
