import { io } from "socket.io-client";
import {
    SOCKET_ACTION,
    SOCKET_TODO_CHECK,
    SOCKET_TODO_CLEAR_COMPLETED,
    SOCKET_TODO_CREATION,
    SOCKET_TODO_DELETE,
    SOCKET_TODO_UPDATE,
} from "../shared/constants";
import { store } from "../store/store";
import { addToastSuccess } from "../store/actions/toastsActions";
import {
    todoCheckAction,
    todoClearCompletedAction,
    todoCreationAction,
    todoDeleteAction,
    todoUpdateAction,
} from "./notificationActions";

const url = process.env.REACT_APP_SOCKET_URL;

const socket = io(url, {
    cors: { withCredentials: true },
});

socket.on(SOCKET_ACTION, (action) => {
    if (socket.id !== action.data.socketId) {
        const { type, data } = action;

        switch (type) {
            case SOCKET_TODO_CREATION:
                store.dispatch(todoCreationAction(data.newTodo));
                break;

            case SOCKET_TODO_DELETE:
                store.dispatch(todoDeleteAction(data.todoId));
                break;

            case SOCKET_TODO_UPDATE:
                store.dispatch(todoUpdateAction(data.newTodo));
                break;

            case SOCKET_TODO_CHECK:
                store.dispatch(todoCheckAction(data.newTodo));
                break;

            case SOCKET_TODO_CLEAR_COMPLETED:
                store.dispatch(todoClearCompletedAction());
                break;

            default:
                store.dispatch(
                    addToastSuccess({
                        id: new Date(Date.now()),
                        message: "Unknown action type catched.",
                    }),
                );
                break;
        }
    }
});

export default socket;
