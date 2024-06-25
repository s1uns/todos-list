import { router as authRouter } from "./routes/auth/index.js";
import { router as todosRouter } from "./routes/todos/index.js";
import { router as sharedRouter } from "./routes/shared/index.js";
import { router as userRouter } from "./routes/user/index.js";
import express from "express";
import { WebSocketServer } from "ws";
import cookieParser from "cookie-parser";
import responseMiddleware from "./middleware/responseMiddleware.js";
import cors from "cors";
import { logger, errorLogger } from "./middleware/winstonLoggingMiddleware.js";
import expressWinston from "express-winston";
import url from "url";
import { v4 as uuid } from "uuid";
import redisClient from "./redisClient.js";

const app = express();

const origin = process.env.CORS_ORIGIN;
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

const port = process.env.SERVER_PORT;

app.get("/", (req, res) => {
    res.send("Started Working, Express!");
});

app.use("/auth", authRouter);
app.use("/todos", todosRouter);
app.use("/shared", sharedRouter);
app.use("/users", userRouter);

app.use(errorLogger);

const server = app.listen(port, () => {
    logger.info(`Server listening at port: ${port}`);
});
//socket.io

const wsServer = new WebSocketServer({ server });

wsServer.on("connection", function connection(ws, request, client) {
    // const connectionId = uuid();
    // redisClient.setConnection(connectionId, userId);
    // console.log("Client: ", client);
    logger.info("New connection to the websocket");

    ws.on("error", console.error);

    ws.on("message", function message(data) {
        console.log(`Received message ${data} from user ${client}`);
    });

    ws.on("close", () => console.log("Disconnected from the socket."));
});

// emit events from controllers
// socket.io
