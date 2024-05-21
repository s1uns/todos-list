import React, { Component } from "react";

export default class ToDoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            title: this.props.title,
            isCompleted: this.props.isCompleted,
            isUpdated: this.props.isUpdated,
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
        this.setState((prevState) => ({
            ...prevState,
            isCompleted: !this.props.isCompleted,
        }));
    };

    deleteTodo = (id) => {
        this.props.deleteTodo(id);
    };

    updateTodo = (e) => {
        if (e.key === "Enter") {
            const newTodo = {
                id: this.state.id,
                title: e.target.value,
                isUpdated: false,
            };
            if (this.state.title !== e.target.value) {
                this.props.updateTodo(newTodo);
                this.setState((prevState) => ({
                    ...prevState,
                    title: newTodo.title,
                    isUpdated: true,
                }));
            }
            this.setState((prevState) => ({ ...prevState, isEditing: false }));
        }
    };

    toggleEditing = () => {
        this.setState((prevState) => ({
            ...prevState,
            isEditing: !this.state.isEditing,
        }));
    };

    render() {
        const { id, title, isCompleted, isUpdated, isEditing } = this.state;
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
                    {isEditing ? (
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
                    {isUpdated ? <span class="updated-icon">🖊</span> : ""}
                </li>
            </>
        );
    }
}
