import React, { Component } from "react";

class ToDoInput extends Component {
    createTodo = (e) => {
        const { createTodo } = this.props;

        if (e.key === "Enter") {
            const trimmedString = e.target.value.trim();
            if (trimmedString.length == 0) {
                alert("Enter something first!");
                return;
            }

            createTodo(trimmedString);
            e.target.value = "";
        }
    };

    render() {
        return (
            <input
                className="create-todo-input"
                type="text"
                id="add-todo"
                placeholder="What needs to be done?"
                onKeyDown={this.createTodo}
            />
        );
    }
}

export default ToDoInput;
