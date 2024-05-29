import React, { useRef, useState } from "react";

export default function ToDoItem({ id, title, isCompleted, isUpdated }) {
    const inputRef = useRef(null);
    const { isEditing, setIsEditing } = useState(false);

    const toggleEditing = () => {
        if (!isCompleted) {
            setIsEditing((isEditing) => !isEditing);
        }
    };

    const deleteTodo = () => {};

    const updateTodo = () => {};

    const checkTodo = () => {};

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
}
