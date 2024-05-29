import { combineReducers } from "redux";
import { todosReducer } from "./reducer";
import { filterReducer } from "./reducer";

export default combineReducers({
    todosReducer,
    filterReducer,
});
