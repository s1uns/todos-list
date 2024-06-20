import "./App.css";
import Footer from "./components/Footer";
import ToDoInput from "./components/ToDoInput";
import React, { Component } from "react";
import ToDoItem from "./components/ToDoItem";
import store from "./store/Store";
import eventEmitter from "./store/EventEmitter";
import { stateActionType } from "./store/constants";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: store.state.todos,
            currentFilter: store.state.currentFilter,
        };

        eventEmitter.subscribe(
            stateActionType.STATE_UPDATED,
            this.stateUpdated
        );
    }

    stateUpdated = (stateUpdatedAction) => {
        this.setState({
            todos: stateUpdatedAction.payload.todos,
            currentFilter: stateUpdatedAction.payload.currentFilter,
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
