import { handleActions } from "redux-actions";
import { actionSuccessType } from "../actions/constants";

const todosReducer = handleActions(
    {
        [actionSuccessType.ADD_TODO_SUCCESS]: (state, { payload }) => ({
            list: [...state.list, payload],
            currentPage: state.currentPage,
            count: ++state.count,
        }),

        [actionSuccessType.DELETE_TODO_SUCCESS]: (state, { payload }) => ({
            list: state.list.filter((todo) => todo.id !== payload.id),
            currentPage: state.currentPage,
            count: !payload.isCompleted ? --state.count : state.count,
        }),

        [actionSuccessType.CHECK_TODO_SUCCESS]: (state, { payload }) => ({
            list: state.list.map((todo) =>
                todo.id === payload.id
                    ? {
                          ...todo,
                          isCompleted: payload.isCompleted,
                          isUpdated: payload.isUpdated,
                          updatedAt: payload.updatedAt,
                      }
                    : todo,
            ),
            currentPage: state.currentPage,
            count: payload.isCompleted ? --state.count : ++state.count,
        }),

        [actionSuccessType.EDIT_TODO_SUCCESS]: (state, { payload }) => ({
            list: state.list.map((todo) =>
                todo.id === payload.id
                    ? {
                          ...todo,
                          title: payload.title,
                          isUpdated: payload.isUpdated,
                          updatedAt: payload.updatedAt,
                      }
                    : todo,
            ),
            currentPage: state.currentPage,
            count: state.count,
        }),

        [actionSuccessType.SET_TODOS_SUCCESS]: (state, { payload }) => {
            console.log("Payload: ", payload);

            return {
                list: payload.list,
                currentPage: payload.currentPage ? payload.currentPage : 1,
                count: payload.count,
            };
        },

        [actionSuccessType.CLEAR_TODOS_SUCCESS]: (state) => ({
            list: [],
            currentPage: 1,
            count: 0,
        }),

        [actionSuccessType.SET_PAGE_SUCCESS]: (state, { payload }) => ({
            list: payload.list,
            currentPage: payload.currentPage,
            count: payload.count,
        }),
    },
    { list: [], currentPage: 1, count: 0 },
);

export default todosReducer;
