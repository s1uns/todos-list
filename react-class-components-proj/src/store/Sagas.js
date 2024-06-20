import { v4 as uuid } from "uuid";
import eventEmitter from "./EventEmitter";
import { actionRequestType, actionSuccessType } from "./constants";

class Sagas {
    constructor() {
        eventEmitter.subscribe(
            actionRequestType.ADD_TODO_REQUEST,
            this.createTodo
        );

        eventEmitter.subscribe(
            actionRequestType.DELETE_TODO_REQUEST,
            this.deleteTodo
        );

        eventEmitter.subscribe(
            actionRequestType.EDIT_TODO_REQUEST,
            this.editTodo
        );

        eventEmitter.subscribe(
            actionRequestType.CHECK_TODO_REQUEST,
            this.checkTodo
        );

        eventEmitter.subscribe(
            actionRequestType.SET_FILTER_REQUEST,
            this.setFilter
        );

        eventEmitter.subscribe(
            actionRequestType.CLEAR_COMPLETED_REQUEST,
            this.clearCompleted
        );
    }

    createTodo = ({ payload }) => {
        const newTodo = {
            id: uuid(),
            title: payload,
            isChecked: false,
            isUpdated: false,
        };

        eventEmitter.emit({
            type: actionSuccessType.ADD_TODO_SUCCESS,
            payload: newTodo,
        });
    };

    deleteTodo = ({ payload }) => {
        eventEmitter.emit({
            type: actionSuccessType.DELETE_TODO_SUCCESS,
            payload: payload,
        });
    };

    editTodo = ({ payload }) => {
        eventEmitter.emit({
            type: actionSuccessType.EDIT_TODO_SUCCESS,
            payload: payload,
        });
    };

    checkTodo = ({ payload }) => {
        eventEmitter.emit({
            type: actionSuccessType.CHECK_TODO_SUCCESS,
            payload: payload,
        });
    };

    setFilter = ({ payload }) => {
        eventEmitter.emit({
            type: actionSuccessType.SET_FILTER_SUCCESS,
            payload: payload,
        });
    };

    clearCompleted = () => {
        eventEmitter.emit({
            type: actionSuccessType.CLEAR_COMPLETED_SUCCESS,
        });
    };
}

export default Sagas;
