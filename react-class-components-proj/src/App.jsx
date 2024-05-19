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
                ? localStorage.getItem("todos")
                : [
                      {
                          id: 1,
                          title: "Task 1",
                          isCompleted: false,
                          isUpdated: false,
                      },
                      {
                          id: 2,
                          title: "Task 2",
                          isCompleted: true,
                          isUpdated: false,
                      },
                      {
                          id: 3,
                          title: "Task 3",
                          isCompleted: true,
                          isUpdated: false,
                      },
                      {
                          id: 4,
                          title: "Task 4",
                          isCompleted: false,
                          isUpdated: false,
                      },
                      {
                          id: 5,
                          title: "Task 5",
                          isCompleted: true,
                          isUpdated: false,
                      },
                  ],
            currentFilter: "all",
            itemsCount: 0,
        };
        this.setFilter = this.setFilter.bind(this);
        this.clearCompleted = this.clearCompleted.bind(this);
    }

    setFilter(filter) {
        this.setState((prevState) => ({ ...prevState, currentFilter: filter }));
    }

    clearCompleted() {}
    render() {
        const { todos, currentFilter, itemsCount } = this.state;
        return (
            <>
                <h1>ToDoS</h1>
                <div className="container">
                    <ToDoInput />
                    <div className="todos-block">
                        <ul className="todos-list" id="todos-list">
                            {todos.map((item) => (
                                <ToDoItem
                                    key={item.id}
                                    id={item.id}
                                    title={item.title}
                                    isCompleted={item.isCompleted}
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
