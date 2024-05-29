import { combineReducers } from "redux";
import { todosReducer } from "./reducer";
import { filterReducer } from "./reducer";

const rootReducer = combineReducers({
    todosReducer,
    filterReducer,
});

export default rootReducer;
