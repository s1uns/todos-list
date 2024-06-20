import { actionRequestType } from "./constants";
import { actionSuccessType } from "./constants";

const setFilterRequest = (payload) => ({
    type: actionRequestType.SET_FILTER_REQUEST,
    payload: payload,
});

const setFilterSuccess = (payload) => ({
    type: actionSuccessType.SET_FILTER_SUCCESS,
    payload: payload,
});

export { setFilterRequest, setFilterSuccess };
