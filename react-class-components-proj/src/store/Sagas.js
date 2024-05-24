import { v4 as uuid } from "uuid";
import { EventEmitter as eventEmitter } from "./EventEmitter";
import { actionRequestType, actionSuccessType } from "./ActionTypes";

class Sagas {
    constructor() {
        eventEmitter.subscribe(
            actionRequestType.ADD_TODO_REQUEST,
            (newTodo) => {
                newTodo.id = uuid();
                eventEmitter.emit(actionSuccessType.ADD_TODO_SUCCESS, newTodo);
            },
        );

        eventEmitter.subscribe(
            actionRequestType.DELETE_TODO_REQUEST,
            (todoId) => {
                eventEmitter.emit(
                    actionSuccessType.DELETE_TODO_SUCCESS,
                    todoId,
                );
            },
        );

        eventEmitter.subscribe(
            actionRequestType.EDIT_TODO_REQUEST,
            (newTodo) => {
                eventEmitter.emit(actionSuccessType.EDIT_TODO_SUCCESS, newTodo);
            },
        );

        eventEmitter.subscribe(
            actionRequestType.CHECK_TODO_REQUEST,
            (todoId) => {
                eventEmitter.emit(actionSuccessType.CHECK_TODO_SUCCESS, todoId);
            },
        );

        eventEmitter.subscribe(
            actionRequestType.SET_FILTER_REQUEST,
            (filter) => {
                eventEmitter.emit(actionSuccessType.SET_FILTER_SUCCESS, filter);
            },
        );
    }
}
