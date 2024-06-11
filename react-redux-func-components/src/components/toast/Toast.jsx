import "./Toast.css";
import React from "react";
import { useDispatch } from "react-redux";
import { useTimeout } from "../../utils/hooks";
import { actionRequestType } from "../../store/actions/actionTypes";

export default function Toast({ id, message }) {
    const dispatch = useDispatch();

    const handleCloseToast = () =>
        dispatch({
            type: actionRequestType.DISMISS_NOTIFICATION_REQUEST,
            payload: id,
        });

    useTimeout(handleCloseToast, 3000);

    return (
        <div className="toast">
            <p>{message}</p>
            <button className="close-btn" onClick={handleCloseToast}>
                {"\u274c"}
            </button>
        </div>
    );
}
