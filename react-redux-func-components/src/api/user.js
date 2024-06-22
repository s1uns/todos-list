import axios from "axios";
import { customRequest } from "./helpers";
import { GET_REQUEST } from "../shared/constants";

axios.defaults.withCredentials = true;
const url = process.env.REACT_APP_BACKEND_URL;

const getAvailableUsers = async (page, limit) => {
    const response = await customRequest(
        GET_REQUEST,
        `${url}users/available-users?page=${page}&limit=${limit}`,
    );

    return response;
};

export { getAvailableUsers };
