import React, { Component } from "react";

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
        const { id, checkTodo } = this.props;
        checkTodo(id);
    };

    deleteTodo = () => {
        const { id, deleteTodo } = this.props;
        deleteTodo(id);
    };

    updateTodo = (e) => {
        const { id, title, updateTodo } = this.props;

        if (e.key === "Enter") {
            const trimmedString = e.target.value.trim();
            if (trimmedString.length == 0) {
                alert("Enter something first!");
                return;
            }

            const newTodo = {
                id: id,
                title: trimmedString,
                isUpdated: false,
            };
            if (title !== e.target.value) {
                updateTodo(newTodo);
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
                        onChange={() => this.checkTodo(id)}
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
