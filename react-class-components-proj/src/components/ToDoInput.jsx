import React, { Component } from "react";

class ToDoInput extends Component {
    render() {
        return (
            <input
                className="create-todo-input"
                type="text"
                id="add-todo"
                placeholder="What needs to be done?"
            />
        );
    }
}

export default ToDoInput;
