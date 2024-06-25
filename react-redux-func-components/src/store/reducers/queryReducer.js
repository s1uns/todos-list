import { handleActions } from "redux-actions";
import { actionSuccessType } from "../actions/constants";
import { FILTER_ALL } from "../../shared/constants";

const queryReducer = handleActions(
    {
        [actionSuccessType.SET_QUERY_SUCCESS]: (state, { payload }) => ({
            currentPage: payload.currentPage,
            currentFilter: payload.currentFilter,
        }),
    },
    { currentPage: 1, currentFilter: FILTER_ALL }
);

export default queryReducer;
