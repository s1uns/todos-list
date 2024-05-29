import { combineReducers } from "redux";
import { todosReducer, filterReducer } from "./reducer";

const rootReducer = combineReducers({
    todos: todosReducer,
    currentFilter: filterReducer,
});

export default rootReducer;
