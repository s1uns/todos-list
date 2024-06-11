import { handleActions } from "redux-actions";
import { actionSuccessType } from "../actions/actionTypes";

const toastsReducer = handleActions(
    {
        [actionSuccessType.ADD_NOTIFICATION_SUCCESS]: (
            oldNotifications = [],
            { payload },
        ) => [...oldNotifications, payload],

        [actionSuccessType.DISMISS_NOTIFICATION_SUCCESS]: (
            oldNotifications = [],
            { payload },
        ) => oldNotifications.filter((toast) => toast.id !== payload),
    },
    [],
);

export default toastsReducer;
