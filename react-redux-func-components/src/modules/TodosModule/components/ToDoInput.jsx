import React from "react";
import { useDispatch } from "react-redux";
import { actionRequestType } from "../../../store/actions/actionTypes";
import styled from "@emotion/styled";
import { Input } from "../../../shared/components/Input";

const StyledInput = styled(Input)({
    width: "100%",

    "& .MuiInputBase-input": {
        width: "100%",
        fontSize: "2rem",
    },
    "& fieldset": { borderTop: "none" },
});

const ToDoInput = () => {
    const dispatch = useDispatch();
    const createTodo = (e) => {
        if (e.key === "Enter") {
            const trimmedString = e.target.value.trim();
            if (trimmedString.length === 0) {
                dispatch({
                    type: actionRequestType.ADD_NOTIFICATION_REQUEST,
                    payload: {
                        id: new Date(Date.now()),
                        message: "Enter something first!",
                    },
                });
                return;
            }

            e.target.value = "";
            dispatch({
                type: actionRequestType.ADD_TODO_REQUEST,
                payload: trimmedString,
            });
        }
    };

    return (
        <StyledInput
            type="text"
            id="add-todo"
            placeholder="What needs to be done?"
            onKeyDown={createTodo}
        />
    );
};

export default ToDoInput;
