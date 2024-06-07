import { combineReducers } from "redux";
import todosReducer from "./todosReducer";
import filterReducer from "./filterReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    todos: todosReducer,
    currentFilter: filterReducer,
    user: userReducer,
});

export default rootReducer;
