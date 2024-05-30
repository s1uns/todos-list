import React, { Component } from "react";
import eventEmitter from "../store/EventEmitter";
import { actionRequestType } from "../store/ActionTypes";

class ToDoInput extends Component {
    createTodo = (e) => {
        if (e.key === "Enter") {
            const trimmedString = e.target.value.trim();
            if (trimmedString.length === 0) {
                alert("Enter something first!");
                return;
            }

            eventEmitter.emit(
                {
                    type: actionRequestType.ADD_TODO_REQUEST,
                    payload: trimmedString
                }
            );

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
