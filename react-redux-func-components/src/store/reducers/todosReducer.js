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
                count: ++state.count,
                totalPages: newList.length / TODOS_LIMIT,
            };
        },

        [actionSuccessType.DELETE_TODO_SUCCESS]: (state, { payload }) => {
            const newList = state.list.filter((todo) => todo.id !== payload.id);

            return {
                list: newList,
                currentPage: state.currentPage,
                count: !payload.isCompleted ? --state.count : state.count,
                totalPages: newList.length / TODOS_LIMIT,
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
                count: payload.isCompleted ? --state.count : ++state.count,
                totalPages: newList.length / TODOS_LIMIT,
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
                count: state.count,
                totalPages: newList.length / TODOS_LIMIT,
            };
        },

        [actionSuccessType.SET_TODOS_SUCCESS]: (state, { payload }) => {
            return {
                list: payload.list,
                currentPage: payload.currentPage ? payload.currentPage : 1,
                count: payload.count,
                totalPages: payload.list.length / TODOS_LIMIT,
            };
        },

        [actionSuccessType.CLEAR_TODOS_SUCCESS]: (state) => ({
            list: [],
            currentPage: 1,
            count: 0,
            totalPages: 1,
        }),
    },
    { list: [], currentPage: 1, count: 0, totalPages: 1 }
);

export default todosReducer;
