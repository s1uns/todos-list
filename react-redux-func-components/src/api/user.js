import axios from "axios";
import { getRequest } from "./helpers";

axios.defaults.withCredentials = true;
const url = process.env.REACT_APP_BACKEND_URL;

const getAvailableUsers = async (page, limit) => {
    const response = await getRequest(
        `${url}users/available-users?page=${page}&limit=${limit}`,
    );

    return response;
};

export { getAvailableUsers };
