import React, { useRef, useState, useEffect } from "react";
import { actionRequestType } from "../../../store/actions/actionTypes";
import { useDispatch } from "react-redux";

const ToDoItem = ({ id, title, isCompleted, isUpdated }) => {
    const dispatch = useDispatch();
    const inputRef = useRef(null);
    const [isEditing, setIsEditing] = useState(false);

    const toggleEditing = () => {
        if (!isCompleted) {
            setIsEditing((isEditing) => !isEditing);
        }
    };

    const handleClickOutside = (event) => {
        const path = event.composedPath();
        if (inputRef.current && !path.includes(inputRef.current)) {
            setIsEditing(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const deleteTodo = () =>
        dispatch({
            type: actionRequestType.DELETE_TODO_REQUEST,
            payload: id,
        });

    const updateTodo = (e) => {
        if (e.key === "Enter") {
            const trimmedString = e.target.value.trim();
            if (trimmedString.length === 0) {
                alert("Enter something first!");
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
        dispatch({
            type: actionRequestType.CHECK_TODO_REQUEST,
            payload: id,
        });
    };

    return (
        <>
            <li
                id={id}
                className={`todo-item ${isCompleted ? "completed" : ""}`}
            >
                <input
                    type="checkbox"
                    className="chek-todo-btn"
                    checked={isCompleted}
                    onChange={checkTodo}
                />
                {isEditing ? (
                    <input
                        ref={inputRef}
                        className="update-todo-input"
                        autoFocus
                        defaultValue={title}
                        onKeyDown={updateTodo}
                    />
                ) : (
                    <span className="todo-title" onDoubleClick={toggleEditing}>
                        {title}
                    </span>
                )}
                <p className="delete-btn" onClick={deleteTodo}>
                    ✖️
                </p>
                {isUpdated ? <span className="updated-icon">🖊</span> : ""}
            </li>
        </>
    );
};

export default ToDoItem;
