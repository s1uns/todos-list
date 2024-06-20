import axios from "axios";
import { store } from "../../store/store";
import { logoutUserRequest } from "../../store/actions/authActions";

axios.defaults.withCredentials = true;

const patchRequest = async (url) => {
    try {
        const response = await axios.patch(url);
        return response.data;
    } catch (err) {
        if (err.response.status === 401) {
            store.dispatch(logoutUserRequest());
        }
        console.log(err.message);
        return err.response.data;
    }
};

export default patchRequest;
