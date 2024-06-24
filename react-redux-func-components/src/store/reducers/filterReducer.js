import { handleActions } from "redux-actions";
import { actionSuccessType } from "../actions/constants";
import { FILTER_ALL } from "../../shared/constants";

const filterReducer = handleActions(
    {
        [actionSuccessType.SET_FILTER_SUCCESS]: (state, { payload }) => payload,
    },
    FILTER_ALL,
);

export default filterReducer;
