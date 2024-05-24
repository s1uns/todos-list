import { actionSuccessType, stateActionType } from "./ActionTypes";
import eventEmitter from "./EventEmitter";

class Store {
    constructor() {
        this.state = {
            todos: [
                {
                    id: "123213",
                    title: "1231231",
                    isCompleted: false,
                    isUpdated: false,
                },
            ],
            currentFilter: "all",
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
    }

    createTodo = ({ payload }) => {
        const { todos } = this.state;
        const newTodosList = [...todos, payload];
        this.state = { todos: newTodosList };

        eventEmitter.emit({
            type: stateActionType.STATE_UPDATED,
            payload: newTodosList,
        });
    };

    deleteTodo = ({ payload }) => {
        const { todos } = this.state;
        const newTodosList = todos.filter((todo) => todo.id !== payload);
        this.state = { todos: newTodosList };

        eventEmitter.emit({
            type: stateActionType.STATE_UPDATED,
            payload: newTodosList,
        });
    };

    checkTodo = ({ payload }) => {
        const { todos } = this.state;
        const newTodosList = todos.map((todo) => {
            if (todo.id === payload) {
                todo.isCompleted = !todo.isCompleted;
            }

            return todo;
        });
        this.state = { todos: newTodosList };

        eventEmitter.emit({
            type: stateActionType.STATE_UPDATED,
            payload: newTodosList,
        });
    };

    editTodo = ({ payload }) => {
        const { todos } = this.state;
        const newTodosList = todos.map((todo) => {
            if (todo.id === payload.id) {
                todo.title = payload.title;
                todo.isUpdated = true;
            }

            return todo;
        });
        this.state = { todos: newTodosList };

        eventEmitter.emit({
            type: stateActionType.STATE_UPDATED,
            payload: newTodosList,
        });
    };

    setFilter = (filter) => {
        const { currentFilter } = this.state;
        currentFilter = filter;
        eventEmitter.emit(stateActionType.STATE_UPDATED);
    };
}

const store = new Store();
export default store;
