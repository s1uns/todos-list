import React, { useState } from "react";
import { actionRequestType } from "../../../store/actions/actionTypes";
import { useDispatch } from "react-redux";
import { ListItem, Typography, colors } from "@mui/material";
import { styled } from "@mui/material";
import CheckBox from "../../../shared/components/CheckBox";
import Input from "../../../shared/components/Input";
import { ClickAwayListener } from "@mui/material";

const UpdateTodoInput = styled(Input)({
    "& .MuiInputBase-input": {
        marginLeft: "4rem",
        fontSize: "5rem",
        width: "100%",
        height: "100%",
    },
});

const TodoItem = styled(ListItem)({
    padding: 5,
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: "0.5rem",
    width: "100%",
    border: "0.05rem dotted black",

    "&:not(:last-child)": {
        marginBottom: "0.5rem",
    },
});

const DeleteButton = styled(Typography)({
    position: "absolute",
    right: "0.5rem",
    fontSize: "3rem",
    zIndex: 500,

    "&:hover": { cursor: "pointer", fontSize: "3.1rem" },
});

const StyledCheckBox = styled(CheckBox)({
    "& .MuiSvgIcon-root": {
        width: "4rem",
        height: "4rem",
        fontSize: "50rem",
    },
    position: "absolute",
    marginRight: "1.5rem",
    zIndex: 500,
    border: "none",
});

const TodoTitle = styled(Typography)({
    paddingLeft: "5rem",
    fontSize: "5rem",
    width: "100%",

    ".completed &": {
        backgroundColor: "rgb(236, 235, 235)",
        opacity: 0.2,
        textDecoration: "line-through",
    },
});

const UpdatedIcon = styled(Typography)({
    paddingLeft: "4rem",
    fontSize: "5rem",
    width: "100%",
    position: "absolute",
    left: "70%",
});

const ToDoItem = ({ id, title, isCompleted, isUpdated }) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);

    const toggleEditing = () => {
        if (!isCompleted) {
            setIsEditing((isEditing) => !isEditing);
        }
    };

    const deleteTodo = () =>
        dispatch({
            type: actionRequestType.DELETE_TODO_REQUEST,
            payload: id,
        });

    const updateTodo = (e) => {
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

            const newTodo = {
                id: id,
                title: trimmedString,
            };

            if (title !== trimmedString) {
                dispatch({
                    type: actionRequestType.EDIT_TODO_REQUEST,
                    payload: newTodo,
                });
            }
            toggleEditing();
        }
    };

    const checkTodo = () => {
        if (!isEditing) {
            dispatch({
                type: actionRequestType.CHECK_TODO_REQUEST,
                payload: id,
            });
        } else {
            dispatch({
                type: actionRequestType.ADD_NOTIFICATION_REQUEST,
                payload: {
                    id: new Date(Date.now()),
                    message: "Finish editing the todo first!",
                },
            });
            return;
        }
    };

    return (
        <>
            <TodoItem id={id} className={isCompleted ? "completed" : ""}>
                <StyledCheckBox
                    name={id}
                    type="checkbox"
                    className="chek-todo-btn"
                    checked={isCompleted}
                    onChange={checkTodo}
                />
                {isEditing ? (
                    <ClickAwayListener onClickAway={toggleEditing}>
                        <UpdateTodoInput
                            autoFocus
                            defaultValue={title}
                            onKeyDown={updateTodo}
                        />
                    </ClickAwayListener>
                ) : (
                    <TodoTitle onDoubleClick={toggleEditing}>{title}</TodoTitle>
                )}
                <DeleteButton onClick={deleteTodo}>✖️</DeleteButton>
                {isUpdated ? <UpdatedIcon>🖊</UpdatedIcon> : ""}
            </TodoItem>
        </>
    );
};

export default ToDoItem;
