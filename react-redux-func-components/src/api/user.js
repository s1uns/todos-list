import axios from "axios";
import { customRequest } from "./helpers";
import { GET_REQUEST, USERS_LIMIT } from "../shared/constants";

axios.defaults.withCredentials = true;
const url = process.env.REACT_APP_BACKEND_URL;

const getAvailableUsers = async (page) => {
    const response = await customRequest(
        GET_REQUEST,
        `${url}users/available-users?page=${page}&limit=${USERS_LIMIT}`,
    );

    return response;
};

export { getAvailableUsers };
