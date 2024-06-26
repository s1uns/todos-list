import { io } from "socket.io-client";

const socket = io("ws://localhost:5001", {
    cors: { withCredentials: true },
});

socket.on("todo-creation", () => alert("TODO CREATED")); 

// special notification saga
// rename to notifications/socket
// notificationsSaga
// notification with {type: , data: }

export default socket;
