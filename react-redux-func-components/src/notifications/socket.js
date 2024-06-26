import { io } from "socket.io-client";
import {
    SOCKET_ACTION,
    SOCKET_TODO_CREATION,
    SOCKET_TODO_DELETE,
} from "../shared/constants";
import { store } from "../store/store";
import {
    createTodoSuccess,
    deleteTodoSuccess,
} from "../store/actions/todosActions";

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

            default:
                console.log("Unknown action");
                break;
        }
    }
});

// special notification saga
// rename to notifications/socket
// notificationsSaga
// notification with {type: , data: }

export default socket;
