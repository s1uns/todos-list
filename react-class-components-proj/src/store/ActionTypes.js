const actionType = {
    ADD_TODO: "ADD_TODO",
    CHECK_TODO: "CHECK_TODO",
    EDIT_TODO: "EDIT_TODO",
    DELETE_TODO: "DELETE_TODO",
};

const addTodoAction = (payload) => ({ type: actionType.ADD_TODO, payload });
const checkTodoAction = (payload) => ({ type: actionType.CHECK_TODO, payload });
const editTodoAction = (payload) => ({ type: actionType.EDIT_TODO, payload });
const deleteTodoAction = (payload) => ({
    type: actionType.DELETE_TODO,
    payload,
});
