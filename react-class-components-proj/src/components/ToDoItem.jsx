import React, { Component } from "react";

export default class ToDoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
        };
        this.wrapperRef = React.createRef();
    }
    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if (
            this.wrapperRef &&
            this.wrapperRef.current &&
            !this.wrapperRef.current.contains(event.target)
        ) {
            this.toggleEditing();
        }
    };
    checkTodo = (id) => {
        this.props.checkTodo(id);
    };

    deleteTodo = (id) => {
        this.props.deleteTodo(id);
    };

    updateTodo = (e) => {
        if (e.key === "Enter") {
            const newTodo = {
                id: this.props.id,
                title: e.target.value,
                isUpdated: false,
            };
            if (this.props.title !== e.target.value) {
                this.props.updateTodo(newTodo);
            }
            this.toggleEditing();
        }
    };

    toggleEditing = () => {
        if (!this.props.isCompleted) {
            this.setState({
                isEditing: !this.state.isEditing,
            });
        }
    };

    render() {
        const { id, title, isCompleted, isUpdated } = this.props;
        const { wrapperRef, updateTodo, toggleEditing, checkTodo, deleteTodo } =
            this;
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
                        onChange={() => checkTodo(id)}
                    />
                    {this.state.isEditing ? (
                        <input
                            ref={wrapperRef}
                            className="update-todo-input"
                            autoFocus
                            defaultValue={title}
                            onKeyDown={updateTodo}
                        />
                    ) : (
                        <span
                            className="todo-title"
                            onDoubleClick={() => toggleEditing()}
                        >
                            {title}
                        </span>
                    )}
                    <p className="delete-btn" onClick={() => deleteTodo(id)}>
                        ✖️
                    </p>
                    {isUpdated ? <span className="updated-icon">🖊</span> : ""}
                </li>
            </>
        );
    }
}
