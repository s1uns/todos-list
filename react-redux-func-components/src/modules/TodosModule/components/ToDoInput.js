import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { Input } from "../../../shared/components/Input";
import { addToastRequest } from "../../../store/actions/toastsActions";
import { createTodoRequest } from "../../../store/actions/todosActions";
import { FILTER_ALL } from "../../../shared/constants";
import { setCurrentFilterRequest } from "../../../store/actions/queryActions";

const ToDoInput = () => {
    const dispatch = useDispatch();
    const { fullName } = useSelector((state) => (state.user ? state.user : {}));

    const createTodo = (e) => {
        if (e.key === "Enter") {
            const trimmedString = e.target.value.trim();
            if (trimmedString.length === 0) {
                dispatch(
                    addToastRequest({
                        id: new Date(Date.now()),
                        message: "Enter something first!",
                    }),
                );
                return;
            }

            e.target.value = "";
            dispatch(setCurrentFilterRequest(FILTER_ALL));
            dispatch(
                createTodoRequest({
                    author: fullName,
                    title: trimmedString,
                }),
            );
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
