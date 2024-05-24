import "./App.css";
import Footer from "./components/Footer";
import ToDoInput from "./components/ToDoInput";
import { v4 as uuid } from "uuid";
import React, { Component } from "react";
import ToDoItem from "./components/ToDoItem";
import store from "./store/Store";
import eventEmitter from "./store/EventEmitter";
import { stateActionType } from "./store/ActionTypes";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: store.state.todos,
            currentFilter: "all",
        };

        eventEmitter.subscribe(
            stateActionType.STATE_UPDATED,
            this.stateUpdated,
        );
    }

    stateUpdated = (stateUpdatedAction) => {
        console.log("New list: ", stateUpdatedAction.payload);

        this.setState({ todos: stateUpdatedAction.payload });
    };

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
                        {console.log("Filtrated items: ", filtratedTodos)}
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
