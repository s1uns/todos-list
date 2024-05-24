export const actionType = {
    GET_TODOS: "GET_TODOS",
    GET_FILTER: "GET_FILTER",
    ADD_TODO: "ADD_TODO",
    CHECK_TODO: "CHECK_TODO",
    EDIT_TODO: "EDIT_TODO",
    DELETE_TODO: "DELETE_TODO",
    SET_FILTER: "SET_FILTER",
};

const getTodosAction = (payload) => ({ type: actionType.GET_TODOS, payload });
const getFilterAction = (payload) => ({ type: actionType.GET_FILTER, payload });
const addTodoAction = (payload) => ({ type: actionType.ADD_TODO, payload });
const checkTodoAction = (payload) => ({ type: actionType.CHECK_TODO, payload });
const editTodoAction = (payload) => ({ type: actionType.EDIT_TODO, payload });
const deleteTodoAction = (payload) => ({
    type: actionType.DELETE_TODO,
    payload,
});
const setFilterAction = (payload) => ({ type: actionType.SET_FILTER, payload });
