import { handleActions } from "redux-actions";
import { actionSuccessType } from "../actions/actionTypes";

const filterReducer = handleActions(
    {
        [actionSuccessType.SET_FILTER_SUCCESS]: (
            currentFilter = "all",
            { payload },
        ) => payload,
    },
    "all",
);

export default filterReducer;
