import axios from "axios";
import { postRequest } from "./helpers";

axios.defaults.withCredentials = true;
const url = process.env.REACT_APP_BACKEND_URL;

const manageShared = async (userId) => {
    const response = await postRequest(`${url}shared/${userId}`);

    return response;
};

export { manageShared };
