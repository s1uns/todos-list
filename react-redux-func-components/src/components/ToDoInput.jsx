import React from "react";

export default function ToDoInput() {
    const createTodo = (e) => {
        if (e.key === "Enter") {
            const trimmedString = e.target.value.trim();
            if (trimmedString.length == 0) {
                alert("Enter something first!");
                return;
            }

            e.target.value = "";
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
