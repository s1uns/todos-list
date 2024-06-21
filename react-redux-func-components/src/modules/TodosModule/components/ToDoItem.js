import React, { useState } from "react";
import { actionRequestType } from "../../../store/actions/constants";
import { useDispatch } from "react-redux";
import { Avatar, ClickAwayListener, ListItem, Typography } from "@mui/material";
import styled from "@emotion/styled";
import CheckBox from "../../../shared/components/CheckBox";
import { Input } from "../../../shared/components/Input";
import {
    checkTodoRequest,
    deleteTodoRequest,
    editTodoRequest,
} from "../../../store/actions/todosActions";
import { addNotificationRequest } from "../../../store/actions/notificationsActions";

const ToDoItem = ({ id, title, isCompleted, isUpdated, isAuthor, author }) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);

    const toggleEditing = () => {
        if (!isCompleted) {
            setIsEditing((isEditing) => !isEditing);
        }
    };

    const deleteTodo = () =>
        dispatch(deleteTodoRequest({ id: id, isCompleted: isCompleted }));

    const getTodoAuthor = (authorFullname) => {
        const fullName = authorFullname.split(" ");
        return `${fullName[0][0]} ${fullName[1][0]}`;
    };

    const updateTodo = (e) => {
        if (e.key === "Enter") {
            const trimmedString = e.target.value.trim();
            if (trimmedString.length === 0) {
                dispatch(
                    addNotificationRequest({
                        id: new Date(Date.now()),
                        message: "Enter something first!",
                    }),
                );
                return;
            }

            const newTodo = {
                id: id,
                title: trimmedString,
            };

            if (title !== trimmedString) {
                dispatch(editTodoRequest(newTodo));
            }
            toggleEditing();
        }
    };

    const checkTodo = () => {
        if (!isEditing) {
            dispatch(checkTodoRequest(id));
        } else {
            dispatch(
                addNotificationRequest({
                    id: new Date(Date.now()),
                    message: "Finish editing the todo first!",
                }),
            );
            return;
        }
    };

    return (
        <>
            <TodoItem
                id={id}
                isAuthor={isAuthor}
                className={isCompleted ? "completed" : ""}
            >
                <StyledCheckBox
                    name={id}
                    type="checkbox"
                    className="chek-todo-btn"
                    checked={isCompleted}
                    onChange={checkTodo}
                />

                {isEditing ? (
                    <ClickAwayListener onClickAway={toggleEditing}>
                        <div>
                            <UpdateTodoInput
                                autoFocus
                                defaultValue={title}
                                onKeyDown={updateTodo}
                            />
                        </div>
                    </ClickAwayListener>
                ) : (
                    <TodoTitle onDoubleClick={toggleEditing}>{title}</TodoTitle>
                )}
                <DeleteButton onClick={deleteTodo}>✖️</DeleteButton>
                {isUpdated ? <UpdatedIcon>🖊</UpdatedIcon> : ""}
                {isAuthor ? (
                    ""
                ) : (
                    <AuthorAvatar title={author}>
                        {getTodoAuthor(author)}
                    </AuthorAvatar>
                )}
            </TodoItem>
        </>
    );
};

export default ToDoItem;

const UpdateTodoInput = styled(Input)({
    "& .MuiInputBase-input": {
        marginLeft: "4rem",
        fontSize: "3rem",
        width: "100%",
        height: "100%",
    },
});

const AuthorAvatar = styled(Avatar)({
    position: "absolute",
    top: ".5rem",
    right: ".5rem",
    fontSize: ".5rem",
    width: "1.5rem",
    height: "1.5rem",
});

const TodoItem = styled(ListItem)((props) => ({
    padding: 5,
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: "0.5rem",
    width: "100%",
    border: "0.05rem dotted black",
    backgroundColor: `${props.isAuthor ? "white" : "#F5F5F5"}`,
    height: `${props.isAuthor ? "5rem" : "7rem"}`,

    "&:not(:last-child)": {
        marginBottom: "0.5rem",
    },
}));

const DeleteButton = styled(Typography)({
    position: "absolute",
    right: "0.5rem",
    fontSize: "2rem",
    zIndex: 500,

    "&:hover": { cursor: "pointer", fontSize: "2.1rem" },
});

const StyledCheckBox = styled(CheckBox)({
    "& .MuiSvgIcon-root": {
        width: "3rem",
        height: "3rem",
        fontSize: "50rem",
    },
    position: "absolute",
    marginRight: "1.5rem",
    zIndex: 500,
    border: "none",

    "& .Mui-checked": {
        color: "red",
    },
});

const TodoTitle = styled(Typography)({
    paddingLeft: "4rem",
    fontSize: "3rem",
    width: "100%",

    ".completed &": {
        backgroundColor: "rgb(236, 235, 235)",
        opacity: 0.2,
        textDecoration: "line-through",
    },
});

const UpdatedIcon = styled(Typography)({
    paddingLeft: "4rem",
    fontSize: "3rem",
    width: "100%",
    position: "absolute",
    left: "75%",
    ".completed &": {
        opacity: 0.5,
    },
});
