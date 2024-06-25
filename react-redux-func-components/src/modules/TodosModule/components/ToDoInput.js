import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { Input } from "../../../shared/components/Input";
import { addNotificationRequest } from "../../../store/actions/notificationsActions";
import { createTodoRequest } from "../../../store/actions/todosActions";
import { FILTER_ALL } from "../../../shared/constants";
import { setQueryRequest } from "../../../store/actions/queryActions";

const ToDoInput = () => {
    const dispatch = useDispatch();

    const { currentPage } = useSelector((state) => state.query);

    const createTodo = (e) => {
        if (e.key === "Enter") {
            const trimmedString = e.target.value.trim();
            if (trimmedString.length === 0) {
                dispatch(
                    addNotificationRequest({
                        id: new Date(Date.now()),
                        message: "Enter something first!",
                    })
                );
                return;
            }

            e.target.value = "";
            dispatch(
                setQueryRequest({
                    currentPage: currentPage,
                    currentFilter: FILTER_ALL,
                })
            );
            dispatch(createTodoRequest(trimmedString));
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
