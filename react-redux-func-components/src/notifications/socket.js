import { io } from "socket.io-client";
import {
    SOCKET_ACTION,
    SOCKET_TODO_CHECK,
    SOCKET_TODO_CREATION,
    SOCKET_TODO_DELETE,
    SOCKET_TODO_UPDATE,
} from "../shared/constants";
import { store } from "../store/store";
import {
    checkTodoSuccess,
    createTodoSuccess,
    deleteTodoSuccess,
    editTodoSuccess,
} from "../store/actions/todosActions";
import { addToastSuccess } from "../store/actions/toastsActions";

const url = process.env.REACT_APP_SOCKET_URL;

const socket = io(url, {
    cors: { withCredentials: true },
});

socket.on(SOCKET_ACTION, (action) => {
    if (socket.id !== action.data.socketId) {
        const { type, data } = action;

        switch (type) {
            case SOCKET_TODO_CREATION:
                store.dispatch(createTodoSuccess(data.newTodo));
                break;

            case SOCKET_TODO_DELETE:
                store.dispatch(deleteTodoSuccess(data.todoId));
                break;

            case SOCKET_TODO_UPDATE:
                store.dispatch(editTodoSuccess(data.newTodo));
                break;

            case SOCKET_TODO_CHECK:
                store.dispatch(checkTodoSuccess(data.newTodo));
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
