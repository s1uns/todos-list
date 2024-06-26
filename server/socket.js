import { Server } from "socket.io";
const origin = process.env.CORS_ORIGIN;


class SocketService {
    constructor() {
        this.io = null;
    }

    initSocket(server) {
        this.io = new Server(server, {
            cors: { credentials: true, origin: origin },
        });
    }

    getIO() {
        if (!this.io) {
            throw new Error("Socket.IO not initialized!");
        }
        return this.io;
    }
}

export default new SocketService();
