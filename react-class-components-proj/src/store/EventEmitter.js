const EventEmitter = require("events");
import { actionType } from "./ActionTypes";
import { initialState } from "./Store";

export const eventEmitter = new EventEmitter();

eventEmitter.on(actionType.ADD_TODO, (todo) => {
    initialState.todos = [...initialState.todos, todo];
});

eventEmitter.on(actionType.DELETE_TODO, (todoId) => {
    initialState.todos = initialState.todos.filter(
        (todo) => todo.id !== todoId,
    );
});

eventEmitter.on(actionType.CHECK_TODO, (todoId) => {
    initialState.todos = initialState.todos.map((todo) => {
        if (todo.id === todoId) {
            todo.isChecked = !todo.isChecked;
        }
        return todo;
    });
});

eventEmitter.on(actionType.EDIT_TODO, (newTodo) => {
    initialState.todos = initialState.todos.map((todo) => {
        if (todo.id === newTodo.id && todo.title !== newTodo.title) {
            todo.title = newTodo.title;
            todo.isUpdated = true;
        }
        return todo;
    });
});

