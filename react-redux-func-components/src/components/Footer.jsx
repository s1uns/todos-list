import React from "react";
import { useDispatch } from "react-redux";
import { actionRequestType } from "../store/actions/actionTypes";

export default function Footer({ itemsCount, currentFilter }) {
    const dispatch = useDispatch();

    const setFilter = (filter) => {
        dispatch({
            type: actionRequestType.SET_FILTER_REQUEST,
            payload: filter,
        });
    };

    const clearCompleted = () => {
        dispatch({ type: actionRequestType.CLEAR_COMPLETED_REQUEST });
    };
    return (
        <div className="todos-footer">
            <span id="counter">{itemsCount} items left</span>
            <div className="todos-filters">
                <button
                    id="all-btn"
                    className={currentFilter === "all" ? "active" : ""}
                    onClick={() => setFilter("all")}
                >
                    All
                </button>
                <button
                    id="active-btn"
                    className={currentFilter === "active" ? "active" : ""}
                    onClick={() => setFilter("active")}
                >
                    Active
                </button>
                <button
                    id="completed-btn"
                    className={currentFilter === "completed" ? "active" : ""}
                    onClick={() => setFilter("completed")}
                >
                    Completed
                </button>
            </div>
            <button id="clear-btn" onClick={clearCompleted}>
                Clear completed
            </button>
        </div>
    );
}
