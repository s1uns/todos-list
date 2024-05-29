import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers/rootReducer";
import rootSaga from "./sagas/saga";

const initialState = {
    todos: [],
    currentFilter: "All",
};
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware),
);

// sagaMiddleware.run(rootSaga);

export default store;
