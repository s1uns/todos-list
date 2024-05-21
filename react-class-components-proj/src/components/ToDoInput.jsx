import React, { Component } from "react";

class ToDoInput extends Component {
    createTodo = (e) => {
        if (e.key === "Enter") {
            this.props.createTodo(e.target.value);
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
