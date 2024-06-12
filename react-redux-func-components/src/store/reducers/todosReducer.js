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
                todo.id === payload.id
                    ? {
                          ...todo,
                          isCompleted: payload.isCompleted,
                          isUpdated: payload.isUpdated,
                          updatedAt: payload.updatedAt,
                      }
                    : todo,
            ),

        [actionSuccessType.EDIT_TODO_SUCCESS]: (oldTodos, { payload }) =>
            oldTodos.map((todo) =>
                todo.id === payload.id
                    ? {
                          ...todo,
                          title: payload.title,
                          isUpdated: payload.isUpdated,
                          updatedAt: payload.updatedAt,
                      }
                    : todo,
            ),

        [actionSuccessType.SET_TODOS_SUCCESS]: (state, { payload }) => [
            ...payload,
        ],

        [actionSuccessType.CLEAR_TODOS_SUCCESS]: (state) => [],
    },
    [],
);

export default todosReducer;
