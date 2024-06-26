import {
    SOCKET_TODO_CHECK,
    SOCKET_TODO_CREATION,
    SOCKET_TODO_DELETE,
    SOCKET_TODO_UPDATE,
    SOCKET_USER_AUTHORIZATION,
    SOCKET_USER_LOGOUT,
} from "../shared/constants";

const authAction = (userId) => ({
    type: SOCKET_USER_AUTHORIZATION,
    data: userId,
});

const logoutAction = () => ({
    type: SOCKET_USER_LOGOUT,
});

const todoCreationAction = (newTodo) => ({
    type: SOCKET_TODO_CREATION,
    data: newTodo,
});

const todoUpdateAction = (updatedTodo) => ({
    type: SOCKET_TODO_UPDATE,
    data: updatedTodo,
});

const todoDeleteAction = (deletedTodoId) => ({
    type: SOCKET_TODO_DELETE,
    data: deletedTodoId,
});

const todoCheckAction = (checkedTodoId) => ({
    type: SOCKET_TODO_CHECK,
    data: checkedTodoId,
});

export {
    authAction,
    logoutAction,
    todoCreationAction,
    todoCheckAction,
    todoUpdateAction,
    todoDeleteAction,
};
