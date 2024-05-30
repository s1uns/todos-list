import React from "react";
import { useDispatch } from "react-redux";
import { actionRequestType } from "../store/actions/actionTypes";

export default function ToDoInput() {
    const dispatch = useDispatch();
    const createTodo = (e) => {
        if (e.key === "Enter") {
            const trimmedString = e.target.value.trim();
            if (trimmedString.length == 0) {
                alert("Enter something first!");
                return;
            }

            e.target.value = "";
            dispatch({
                type: actionRequestType.ADD_TODO_REQUEST,
                payload: {
                    title: trimmedString,
                    isCompleted: false,
                    isUpdated: false,
                },
            });
        }
    };

    return (
        <input
            className="create-todo-input"
            type="text"
            id="add-todo"
            placeholder="What needs to be done?"
            onKeyDown={createTodo}
        />
    );
}
