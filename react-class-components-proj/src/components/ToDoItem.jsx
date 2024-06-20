import React, { Component } from "react";
import eventEmitter from "../store/EventEmitter";
import { actionRequestType } from "../store/constants";

export default class ToDoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
        };
        this.inputRef = React.createRef();
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if (
            this.inputRef &&
            this.inputRef.current &&
            !this.inputRef.current.contains(event.target)
        ) {
            this.toggleEditing();
        }
    };

    checkTodo = () => {
        const { id } = this.props;

        eventEmitter.emit({
            type: actionRequestType.CHECK_TODO_REQUEST,
            payload: id,
        });
    };

    deleteTodo = () => {
        const { id } = this.props;

        eventEmitter.emit({
            type: actionRequestType.DELETE_TODO_REQUEST,
            payload: id,
        });
    };

    updateTodo = (e) => {
        const { id, title } = this.props;

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

            if (title !== e.target.value) {
                eventEmitter.emit({
                    type: actionRequestType.EDIT_TODO_REQUEST,
                    payload: newTodo,
                });
            }
            this.toggleEditing();
        }
    };

    toggleEditing = () => {
        const { isCompleted } = this.props;

        const { isEditing } = this.state;
        if (!isCompleted) {
            this.setState({
                isEditing: !isEditing,
            });
        }
    };

    render() {
        const { id, title, isCompleted, isUpdated } = this.props;

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
                        onChange={this.checkTodo}
                    />
                    {this.state.isEditing ? (
                        <input
                            ref={this.inputRef}
                            className="update-todo-input"
                            autoFocus
                            defaultValue={title}
                            onKeyDown={this.updateTodo}
                        />
                    ) : (
                        <span
                            className="todo-title"
                            onDoubleClick={this.toggleEditing}
                        >
                            {title}
                        </span>
                    )}
                    <p className="delete-btn" onClick={this.deleteTodo}>
                        ✖️
                    </p>
                    {isUpdated ? <span className="updated-icon">🖊</span> : ""}
                </li>
            </>
        );
    }
}
