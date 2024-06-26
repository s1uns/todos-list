import { io } from "socket.io-client";
import { SOCKET_TODO_CREATION } from "../shared/constants";

const url = process.env.REACT_APP_SOCKET_URL;
const urlBack = process.env.REACT_APP_BACKEND_URL;
console.log("Url: ", url);
console.log("Url BACKEND: ", urlBack);
const socket = io(url, {
    cors: { withCredentials: true },
});

socket.on(SOCKET_TODO_CREATION, (newTodo) => {
    alert("NEW TODO");
    console.log("New todo: ", newTodo);
});

// special notification saga
// rename to notifications/socket
// notificationsSaga
// notification with {type: , data: }

export default socket;
