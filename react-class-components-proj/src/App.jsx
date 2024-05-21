import "./App.css";
import Footer from "./components/Footer";
import ToDoInput from "./components/ToDoInput";

import React, { Component } from "react";
import ToDoItem from "./components/ToDoItem";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: localStorage.getItem("todos")
                ? JSON.parse(localStorage.getItem("todos"))
                : [],
            currentFilter: "all",
        };
    }

    setFilter = (filter) => {
        this.setState((prevState) => ({
            ...prevState,
            currentFilter: filter,
            todos: this.filtrateTodos(filter),
        }));
    };

    filtrateTodos = (filter) => {
        const allTodos = JSON.parse(localStorage.getItem("todos"));
        this.setState((prevState) => ({
            ...prevState,
            todos: allTodos.filter((todo) => {
                if (filter === "active") {
                    return !todo.isCompleted;
                }

                if (filter === "completed") {
                    return todo.isCompleted;
                }

                return true;
            }),
        }));
    };

    clearCompleted = () => {
        this.setState((prevState) => ({
            ...prevState,
            todos: this.state.todos.filter((todo) => !todo.isCompleted),
        }));
    };

    createTodo = (title) => {
        const todos = JSON.parse(localStorage.getItem("todos"));
        const todo = {
            id: todos.length ? todos[todos.length - 1].id + 1 : 1,
            title: title,
            isCompleted: false,
            isUpdated: false,
        };

        localStorage.setItem("todos", JSON.stringify([...todos, todo]));

        this.setState((prevState) => ({
            ...prevState,
            todos: this.filtrateTodos(this.state.currentFilter),
        }));
    };

    checkTodo = (id) => {
        const todos = JSON.parse(localStorage.getItem("todos"));
        const todo = todos.find((todo) => todo.id === id);
        todo.isCompleted = !todo.isCompleted;
        todo.isUpdated = true;
        this.setState((prevState) => ({ ...prevState, todos: todos }));
        localStorage.setItem("todos", JSON.stringify(todos));
    };

    deleteTodo = (id) => {
        const todos = JSON.parse(localStorage.getItem("todos"));
        localStorage.setItem(
            "todos",
            JSON.stringify([...todos.filter((todo) => todo.id !== id)]),
        );

        this.setState((prevState) => ({
            ...prevState,
            todos: this.state.todos.filter((todo) => todo.id !== id),
        }));
    };

    updateTodo = (newTodo) => {
        const todos = JSON.parse(localStorage.getItem("todos"));
        const oldTodo = todos.find((todo) => todo.id === newTodo.id);
        oldTodo.title = newTodo.title;
        oldTodo.isUpdated = true;
        this.setState((prevState) => ({ ...prevState, todos: todos }));
        localStorage.setItem("todos", JSON.stringify(todos));
    };

    render() {
        const { todos, currentFilter } = this.state;
        const {
            createTodo,
            checkTodo,
            deleteTodo,
            updateTodo,
            setFilter,
            clearCompleted,
        } = this;
        const itemsCount = JSON.parse(localStorage.getItem("todos")).filter(
            (todo) => !todo.isCompleted,
        ).length;

        return (
            <>
                <h1>ToDoS</h1>
                <div className="container">
                    <ToDoInput createTodo={createTodo} />
                    <div className="todos-block">
                        <ul className="todos-list" id="todos-list">
                            {todos.map((item) => (
                                <ToDoItem
                                    key={item.id}
                                    id={item.id}
                                    title={item.title}
                                    isCompleted={item.isCompleted}
                                    checkTodo={checkTodo}
                                    deleteTodo={deleteTodo}
                                    updateTodo={updateTodo}
                                />
                            ))}
                        </ul>
                    </div>
                    <Footer
                        itemsCount={itemsCount}
                        currentFilter={currentFilter}
                        setFilter={setFilter}
                        clearCompleted={clearCompleted}
                    />
                </div>
            </>
        );
    }
}

export default App;
