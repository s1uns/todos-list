import { combineReducers } from "redux";
import todosReducer from "./todosReducer";
import filterReducer from "./filterReducer";
import userReducer from "./userReducer";
import toastsReducer from "./toastsReducer";

const rootReducer = combineReducers({
    todos: todosReducer,
    currentFilter: filterReducer,
    user: userReducer,
    toasts: toastsReducer
});

export default rootReducer;
