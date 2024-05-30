import { actionSuccessType, stateActionType } from "./ActionTypes";
import eventEmitter from "./EventEmitter";

class Store {
    constructor() {
        this.state = {
            todos: localStorage.getItem("todos")
                ? JSON.parse(localStorage.getItem("todos"))
                : [],
            currentFilter: localStorage.getItem("currentFilter")
                ? JSON.parse(localStorage.getItem("currentFilter"))
                : "all",
        };

        eventEmitter.subscribe(
            actionSuccessType.ADD_TODO_SUCCESS,
            this.createTodo,
        );

        eventEmitter.subscribe(
            actionSuccessType.DELETE_TODO_SUCCESS,
            this.deleteTodo,
        );

        eventEmitter.subscribe(
            actionSuccessType.CHECK_TODO_SUCCESS,
            this.checkTodo,
        );

        eventEmitter.subscribe(
            actionSuccessType.EDIT_TODO_SUCCESS,
            this.editTodo,
        );

        eventEmitter.subscribe(
            actionSuccessType.SET_FILTER_SUCCESS,
            this.setFilter,
        );

        eventEmitter.subscribe(
            actionSuccessType.CLEAR_COMPLETED_SUCCESS,
            this.clearCompleted,
        );
    }

    saveState = () => {
        const { todos, currentFilter } = this.state;

        localStorage.setItem("todos", JSON.stringify(todos));
        localStorage.setItem("currentFilter", JSON.stringify(currentFilter));
    };

    createTodo = ({ payload }) => {
        const { todos, currentFilter } = this.state;
        const newTodosList = [...todos, payload];
        this.state = { todos: newTodosList, currentFilter: currentFilter };

        this.saveState();
        eventEmitter.emit({
            type: stateActionType.STATE_UPDATED,
            payload: { todos: newTodosList, currentFilter: currentFilter },
        });
    };

    deleteTodo = ({ payload }) => {
        const { todos, currentFilter } = this.state;
        const newTodosList = todos.filter((todo) => todo.id !== payload);
        this.state = { todos: newTodosList, currentFilter: currentFilter };

        this.saveState();
        eventEmitter.emit({
            type: stateActionType.STATE_UPDATED,
            payload: { todos: newTodosList, currentFilter: currentFilter },
        });
    };

    checkTodo = ({ payload }) => {
        const { todos, currentFilter } = this.state;
        const newTodosList = todos.map((todo) => {
            if (todo.id === payload) {
                todo.isCompleted = !todo.isCompleted;
            }

            return todo;
        });
        this.state = { todos: newTodosList, currentFilter: currentFilter };

        this.saveState();
        eventEmitter.emit({
            type: stateActionType.STATE_UPDATED,
            payload: { todos: newTodosList, currentFilter: currentFilter },
        });
    };

    editTodo = ({ payload }) => {
        const { todos, currentFilter } = this.state;
        const newTodosList = todos.map((todo) => {
            if (todo.id === payload.id) {
                todo.title = payload.title;
                todo.isUpdated = true;
            }

            return todo;
        });
        this.state = { todos: newTodosList, currentFilter: currentFilter };

        this.saveState();
        eventEmitter.emit({
            type: stateActionType.STATE_UPDATED,
            payload: { todos: newTodosList, currentFilter: currentFilter },
        });
    };

    setFilter = ({ payload }) => {
        const { todos } = this.state;
        this.state = { todos: todos, currentFilter: payload };

        this.saveState();
        eventEmitter.emit({
            type: stateActionType.STATE_UPDATED,
            payload: { todos: todos, currentFilter: payload },
        });
    };

    clearCompleted = () => {
        const { todos, currentFilter } = this.state;

        const newTodosList = todos.filter((todo) => !todo.isCompleted);
        this.state = { todos: newTodosList, currentFilter: currentFilter };

        this.saveState();
        eventEmitter.emit({
            type: stateActionType.STATE_UPDATED,
            payload: { todos: newTodosList, currentFilter: currentFilter },
        });
    };
}

const store = new Store();
export default store;
