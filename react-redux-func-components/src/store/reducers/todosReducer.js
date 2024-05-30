import { handleActions } from "redux-actions";
import { actionSuccessType } from "../actions/actionTypes";

const todosReducer = handleActions(
    {
        [actionSuccessType.ADD_TODO_SUCCESS]: (oldTodos = [], { payload }) => [
            ...oldTodos,
            payload,
        ],

        [actionSuccessType.DELETE_TODO_SUCCESS]: (oldTodos = [], { payload }) =>
            oldTodos.filter((todo) => todo.id !== payload),

        [actionSuccessType.CHECK_TODO_SUCCESS]: (oldTodos, { payload }) =>
            oldTodos.map((todo) =>
                todo.id === payload
                    ? { ...todo, isCompleted: !todo.isCompleted }
                    : todo,
            ),

        [actionSuccessType.EDIT_TODO_SUCCESS]: (oldTodos, { payload }) =>
            oldTodos.map((todo) =>
                todo.id === payload.id
                    ? { ...todo, title: payload.title, isUpdated: true }
                    : todo,
            ),

        [actionSuccessType.CLEAR_COMPLETED_SUCCESS]: (oldTodos) =>
            oldTodos.filter((todo) => !todo.isCompleted),
    },
    [],
);

export default todosReducer;
