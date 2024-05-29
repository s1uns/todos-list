import { actionSuccessType } from "../actions/actionTypes";

const initialState = {
    todos: [],
    currentFilter: "All",
};

export function todosReducer(state = initialState, action) {
    switch (action.type) {
        case actionSuccessType.ADD_TODO_SUCCESS: {
            const newTodosList = [...state.todos, action.payload];

            return { ...state, todos: newTodosList };
        }

        case actionSuccessType.DELETE_TODO_SUCCESS: {
            const newTodosList = [
                ...state.todos.filter((todo) => todo.id !== action.payload.id),
            ];

            return {
                ...state,
                todos: newTodosList,
            };
        }

        case actionSuccessType.CHECK_TODO_SUCCESS: {
            const newTodosList = [
                ...state.todos.map((todo) => {
                    if (todo.id === action.payload.id) {
                        todo.isCompleted = !todo.isCompleted;
                    }

                    return todo;
                }),
            ];

            return {
                ...state,
                todos: newTodosList,
            };
        }

        case actionSuccessType.EDIT_TODO_SUCCESS: {
            const newTodosList = [
                ...state.todos.map((todo) => {
                    if (todo.id === action.payload.id) {
                        todo.title = action.payload.title;
                        todo.isUpdated = true;
                    }

                    return todo;
                }),
            ];

            return {
                ...state,
                todos: newTodosList,
            };
        }

        case actionSuccessType.CLEAR_COMPLETED_SUCCESS: {
            const newTodosList = [
                ...state.todos.filter((todo) => !todo.isCompleted),
            ];

            return {
                ...state,
                todos: newTodosList,
            };
        }

        default:
            return state;
    }
}

export function filterReducer(state = initialState, action) {
    switch (action.type) {
        case actionSuccessType.SET_FILTER_SUCCESS: {
            const newFilter = action.payload.currentFilter;

            return { ...state, currentFilter: newFilter };
        }

        default:
            return state;
    }
}
