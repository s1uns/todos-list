import { useState } from "react";
import "./App.css";

function App() {
    //Current filter and todos list should be returned from redux store

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
                <ToDoInput />
                <div className="todos-block">
                    <ul className="todos-list" id="todos-list">
                        {filtratedTodos.map((item) => (
                            <ToDoItem
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                isCompleted={item.isCompleted}
                                isUpdated={item.isUpdated}
                            />
                        ))}
                    </ul>
                </div>
                <Footer itemsCount={itemsCount} currentFilter={currentFilter} />
            </div>
        </>
    );
}

export default App;
