import { router as authRouter } from "./routes/auth/index.js";
import { router as todosRouter } from "./routes/todos/index.js";
import { router as sharedRouter } from "./routes/shared/index.js";
import { router as userRouter } from "./routes/user/index.js";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import responseMiddleware from "./middleware/responseMiddleware.js";
import cors from "cors";
import { logger, errorLogger } from "./middleware/winstonLoggingMiddleware.js";
import expressWinston from "express-winston";
import url from "url";
import { v4 as uuid } from "uuid";
import redisClient from "./redisClient.js";

const origin = process.env.CORS_ORIGIN;
const port = process.env.SERVER_PORT;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {});

app.use(cors({ credentials: true, origin: origin }));

app.use(express.json());
app.use(cookieParser());
app.use(
    expressWinston.logger({
        winstonInstance: logger,
        statusLevels: true,
        colorize: true,
        requestWhitelist: [...expressWinston.requestWhitelist, "body"],
        responseWhitelist: [...expressWinston.responseWhitelist, "body"],
    })
);
app.use(responseMiddleware);

app.get("/", (req, res) => {
    res.send("Started Working, Express!");
});

app.use("/auth", authRouter);
app.use("/todos", todosRouter);
app.use("/shared", sharedRouter);
app.use("/users", userRouter);

app.use(errorLogger);

//socket.io

io.on("connect", (socket) => {
    console.log("Connected to the socket");

    socket.on("error", console.error);

    socket.on("message", function message(data) {
        console.log(`Received message ${data} from user ${client}`);
    });

    socket.on("close", () => console.log("Disconnected"));
});

// emit events from controllers
// socket.io

httpServer.listen(port, () => {
    logger.info(`Server listening at port: ${port}`);
});
