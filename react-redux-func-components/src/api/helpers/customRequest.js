import axios from "axios";
import { store } from "../../store/store";
import { logoutUserRequest } from "../../store/actions/authActions.js";

axios.defaults.withCredentials = true;

const customRequest = async (method, url, data = null) => {
    try {
        const config = {
            method,
            url,
            data,
        };

        const response = await axios(config);
        return response.data;
    } catch (err) {
        console.log("err: ", err);
        if (err.response) {
            if (err.response.status === 401) {
                store.dispatch(logoutUserRequest());
            }

            return err.response.data;
        } else {
            return {
                success: false,
                message: "Couldn't send your request, retry later",
            };
        }
    }
};

export default customRequest;
