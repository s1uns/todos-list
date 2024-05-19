import React, { Component } from "react";

export default class ToDoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            title: this.props.title,
            isCompleted: this.props.isCompleted,
        };
    }
    render() {
        const { id, title, isCompleted } = this.state;
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
                        onChange={() => {}}
                    />
                    <span className="todo-title">{title}</span>
                    <p className="delete-btn">✖️</p>
                </li>
            </>
        );
    }
}
