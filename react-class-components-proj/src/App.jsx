import "./App.css";
import Footer from "./components/Footer";
import ToDoInput from "./components/ToDoInput";
import { v4 as uuid } from "uuid";
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

    componentDidUpdate() {
        const { todos } = this.state;
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    setFilter = (filter) => {
        this.setState({
            currentFilter: filter,
        });
    };

    clearCompleted = () => {
        const { todos } = this.state;
        const filtratedTodos = todos.filter((todo) => !todo.isCompleted);
        this.setState({
            todos: filtratedTodos,
        });
    };

    createTodo = (title) => {
        const { todos } = this.state;
        const todo = {
            id: uuid(),
            title: title,
            isCompleted: false,
            isUpdated: false,
        };

        this.setState({
            todos: [...todos, todo],
        });
    };

    checkTodo = (id) => {
        const { todos } = this.state;
        const todo = todos.find((todo) => todo.id === id);
        todo.isCompleted = !todo.isCompleted;
        this.setState({ todos: todos });
    };

    deleteTodo = (id) => {
        const { todos } = this.state;
        const filtratedTodos = todos.filter((todo) => todo.id !== id);
        this.setState({
            todos: filtratedTodos,
        });
    };

    updateTodo = (newTodo) => {
        const { todos } = this.state;
        const preparedTodos = todos.map((todo) => {
            if (todo.id === newTodo.id) {
                return { ...todo, title: newTodo.title, isUpdated: true };
            }
            return todo;
        });

        this.setState({ todos: preparedTodos });
    };

    render() {
        const { todos, currentFilter } = this.state;

        const itemsCount = todos.filter((todo) => !todo.isCompleted).length;
        const filtratedTodos = todos.filter((todo) => {
            if (currentFilter === "active") {
                return !todo.isCompleted;
            }

            if (currentFilter === "completed") {
                return todo.isCompleted;
            }

            return true;
        });

        return (
            <>
                <h1>ToDoS</h1>
                <div className="container">
                    <ToDoInput createTodo={this.createTodo} />
                    <div className="todos-block">
                        <ul className="todos-list" id="todos-list">
                            {filtratedTodos.map((item) => (
                                <ToDoItem
                                    key={item.id}
                                    id={item.id}
                                    title={item.title}
                                    isCompleted={item.isCompleted}
                                    isUpdated={item.isUpdated}
                                    checkTodo={this.checkTodo}
                                    deleteTodo={this.deleteTodo}
                                    updateTodo={this.updateTodo}
                                />
                            ))}
                        </ul>
                    </div>
                    <Footer
                        itemsCount={itemsCount}
                        currentFilter={currentFilter}
                        setFilter={this.setFilter}
                        clearCompleted={this.clearCompleted}
                    />
                </div>
            </>
        );
    }
}

export default App;
