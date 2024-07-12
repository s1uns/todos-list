import {
	SOCKET_SHARE_TODOS,
	SOCKET_TODO_CHECK,
	SOCKET_TODO_CLEAR_COMPLETED,
	SOCKET_TODO_CREATION,
	SOCKET_TODO_DELETE,
	SOCKET_TODO_UPDATE,
	SOCKET_USER_AUTHORIZATION,
	SOCKET_USER_LOGOUT,
} from "../constants/socketActions.js";

const authAction = () => ({
	type: SOCKET_USER_AUTHORIZATION,
});

const logoutAction = () => ({
	type: SOCKET_USER_LOGOUT,
});

const todoCreationAction = (data) => ({
	type: SOCKET_TODO_CREATION,
	data: data,
});

const todoUpdateAction = (data) => ({
	type: SOCKET_TODO_UPDATE,
	data: data,
});

const todoDeleteAction = (data) => ({
	type: SOCKET_TODO_DELETE,
	data: data,
});

const todoCheckAction = (data) => ({
	type: SOCKET_TODO_CHECK,
	data: data,
});

const todoClearCompletedAction = (data) => ({
	type: SOCKET_TODO_CLEAR_COMPLETED,
	data: data,
});

const sharedTodosActions = (data) => ({
	type: SOCKET_SHARE_TODOS,
	data: data,
});

export {
	authAction,
	logoutAction,
	sharedTodosActions,
	todoCheckAction,
	todoClearCompletedAction,
	todoCreationAction,
	todoDeleteAction,
	todoUpdateAction,
};
