import axios from "axios";
import { store } from "../../store/store";
import { logoutUserRequest } from "../../store/actions/authActions";

axios.defaults.withCredentials = true;

const putRequest = async (url, data) => {
    try {
        const response = await axios.put(url, data);
        return response.data;
    } catch (err) {
        if (err.response?.status === 401) {
            store.dispatch(logoutUserRequest());
            return err.response.data;
        } else {
            return {
                success: false,
                message: "Couldn't send your request, retry later",
            };
        }
    }
};

export default putRequest;
