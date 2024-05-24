import { actionSuccessType, stateActionType } from "./ActionTypes";
import { EventEmitter as eventEmitter } from "./EventEmitter";

class Store {
    constructor() {
        this.state = {
            todos: [],
            currentFilter: "all",
        };

        eventEmitter.subscribe(
            actionSuccessType.ADD_TODO_SUCCESS,
            (newTodo) => {
                const { todos } = this.state;
                todos = [...todos, newTodo];
                eventEmitter.emit(stateActionType.STATE_UPDATED);
            },
        );

        eventEmitter.subscribe(
            actionSuccessType.DELETE_TODO_SUCCESS,
            (todoId) => {
                const { todos } = this.state;
                todos = todos.filter((todo) => todo.id !== todoId);

                eventEmitter.emit(stateActionType.STATE_UPDATED);
            },
        );

        eventEmitter.subscribe(
            actionSuccessType.CHECK_TODO_SUCCESS,
            (todoId) => {
                const { todos } = this.state;
                todos = todos.map((todo) => {
                    if (todo.id === todoId) {
                        todo.isChecked = !todo.isChecked;
                    }

                    return todo;
                });
                eventEmitter.emit(stateActionType.STATE_UPDATED);
            },
        );

        eventEmitter.subscribe(
            actionSuccessType.EDIT_TODO_SUCCESS,
            (newTodo) => {
                const { todos } = this.state;
                todos = todos.map((todo) => {
                    if (
                        todo.id === newTodo.id &&
                        todo.title !== newTodo.title
                    ) {
                        todo.title = newTodo.title;
                        todo.isUpdated = true;
                    }

                    return todo;
                });
                eventEmitter.emit(stateActionType.STATE_UPDATED);
            },
        );

        eventEmitter.subscribe(
            actionSuccessType.SET_FILTER_SUCCESS,
            (filter) => {
                const { currentFilter } = this.state;
                currentFilter = filter;
                eventEmitter.emit(stateActionType.STATE_UPDATED);
            },
        );
    }
}
