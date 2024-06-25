import { handleActions } from "redux-actions";
import { actionSuccessType } from "../actions/constants";
import { TODOS_LIMIT } from "../../shared/constants";

const todosReducer = handleActions(
    {
        [actionSuccessType.ADD_TODO_SUCCESS]: (state, { payload }) => {
            const newList = [...state.list, payload];
            return {
                list: newList,
                currentPage: state.currentPage,
                totalTodos: ++state.totalTodos,
                activeTodos: ++state.activeTodos,
            };
        },

        [actionSuccessType.DELETE_TODO_SUCCESS]: (state, { payload }) => {
            const newList = state.list.filter((todo) => todo.id !== payload.id);

            return {
                list: newList,
                currentPage: state.currentPage,
                totalTodos: --state.totalTodos,
                activeTodos: !payload.isCompleted
                    ? --state.activeTodos
                    : state.activeTodos,
            };
        },

        [actionSuccessType.CHECK_TODO_SUCCESS]: (state, { payload }) => {
            const newList = state.list.map((todo) =>
                todo.id === payload.id
                    ? {
                          ...todo,
                          isCompleted: payload.isCompleted,
                          isUpdated: payload.isUpdated,
                          updatedAt: payload.updatedAt,
                      }
                    : todo
            );

            return {
                list: newList,
                currentPage: state.currentPage,
                totalTodos: state.totalTodos,
                activeTodos: payload.isCompleted
                    ? --state.activeTodos
                    : ++state.activeTodos,
            };
        },

        [actionSuccessType.EDIT_TODO_SUCCESS]: (state, { payload }) => {
            const newList = state.list.map((todo) =>
                todo.id === payload.id
                    ? {
                          ...todo,
                          title: payload.title,
                          isUpdated: payload.isUpdated,
                          updatedAt: payload.updatedAt,
                      }
                    : todo
            );

            return {
                list: newList,
                currentPage: state.currentPage,
                totalTodos: state.totalTodos,
                activeTodos: state.activeTodos,
            };
        },

        [actionSuccessType.SET_TODOS_SUCCESS]: (state, { payload }) => {
            return {
                list: payload.list,
                currentPage: payload.currentPage ? payload.currentPage : 1,
                totalTodos: payload.totalTodos ? payload.totalTodos : 1,
                activeTodos: payload.activeTodos ? payload.activeTodos : 0,
            };
        },

        [actionSuccessType.CLEAR_TODOS_SUCCESS]: (state) => ({
            list: [],
            currentPage: 1,
            totalTodos: 1,
            activeTodos: 0,
        }),
    },
    { list: [], currentPage: 1, totalTodos: 1, activeTodos: 0 }
);

export default todosReducer;
