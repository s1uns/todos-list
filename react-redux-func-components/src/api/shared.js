import axios from "axios";
import { customRequest } from "./helpers";
import { POST_REQUEST } from "../shared/constants";

axios.defaults.withCredentials = true;
const url = process.env.REACT_APP_BACKEND_URL;

const manageShared = async (userId) => {
    const response = await customRequest(
        POST_REQUEST,
        `${url}shared/${userId}`,
    );

    return response;
};

export { manageShared };
