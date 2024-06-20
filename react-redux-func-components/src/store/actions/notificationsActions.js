import { actionRequestType } from "./constants";
import { actionSuccessType } from "./constants";

const addNotificationRequest = (payload) => ({
    type: actionRequestType.ADD_NOTIFICATION_REQUEST,
    payload: payload,
});

const addNotificationSuccess = (payload) => ({
    type: actionSuccessType.ADD_NOTIFICATION_SUCCESS,
    payload: payload,
});

const dismissNotificationRequest = (payload) => ({
    type: actionRequestType.DISMISS_NOTIFICATION_REQUEST,
    payload: payload,
});

const dismissNotificationSuccess = (payload) => ({
    type: actionSuccessType.DISMISS_NOTIFICATION_SUCCESS,
    payload: payload,
});

export {
    addNotificationRequest,
    addNotificationSuccess,
    dismissNotificationRequest,
    dismissNotificationSuccess,
};
