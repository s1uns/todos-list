import { actionRequestType } from "./constants";
import { actionSuccessType } from "./constants";

const setQuerySuccess = (payload) => ({
    type: actionSuccessType.SET_QUERY_SUCCESS,
    payload: payload,
});

const setQueryRequest = (payload) => ({
    type: actionRequestType.SET_QUERY_REQUEST,
    payload: payload,
});
// maybe separate in two requests

export { setQuerySuccess, setQueryRequest };
