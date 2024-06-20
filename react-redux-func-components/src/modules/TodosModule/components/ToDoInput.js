import React from "react";
import { useDispatch } from "react-redux";
import { actionRequestType } from "../../../store/actions/constants";
import styled from "@emotion/styled";
import { Input } from "../../../shared/components/Input";

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

const StyledInput = styled(Input)({
    marginTop: "2rem",
    "& .MuiInputBase-input": {
        fontSize: "2rem",
    },
});
