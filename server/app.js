import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import expressWinston from "express-winston";
import { createServer } from "http";
import responseMiddleware from "./middleware/responseMiddleware.js";
import { errorLogger, logger } from "./middleware/winstonLoggingMiddleware.js";
import redisClient from "./redisClient.js";
import { router as authRouter } from "./routes/auth/index.js";
import { router as sharedRouter } from "./routes/shared/index.js";
import { router as todosRouter } from "./routes/todos/index.js";
import { router as userRouter } from "./routes/user/index.js";
import socketService from "./socket.js";
import {
	SOCKET_ACTION,
	SOCKET_USER_AUTHORIZATION,
	SOCKET_USER_LOGOUT,
} from "./utils/constants/socketActions.js";

const origin = process.env.CORS_ORIGIN;
const port = process.env.SERVER_PORT;

const app = express();
const httpServer = createServer(app);
socketService.initSocket(httpServer);
const io = socketService.getIO();

app.use(
	cors({
		credentials: true,
		origin: origin,
	}),
);

app.use(express.json());
app.use(cookieParser());
app.use(
	expressWinston.logger({
		winstonInstance: logger,
		statusLevels: true,
		colorize: true,
		requestWhitelist: [...expressWinston.requestWhitelist, "body"],
		responseWhitelist: [...expressWinston.responseWhitelist, "body"],
	}),
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

io.on("connect", async (socket) => {

	logger.info(`Unauthorized user connected to the socket ${socket.id}`);

	socket.on("error", logger.error);

	socket.on(SOCKET_ACTION, async (action) => {
		const { type, payload } = action;

		switch (type) {
			case SOCKET_USER_AUTHORIZATION:
				logger.info(
					`The user ${payload} connected to the socket ${socket.id}`,
				);
				await redisClient.setConnection(socket.id, payload);
				break;

			case SOCKET_USER_LOGOUT:
				logger.info(
					`The user disconnected from the socket ${socket.id}`,
				);
				redisClient.deleteConnection(socket.id);
				break;

			default:
				logger.warn("Wrong action catched");
				break;
		}
	});

	socket.on("disconnect", async () => {
		logger.info(`The user disconnected from the socket ${socket.id}`);
		redisClient.deleteConnection(socket.id);
	});
});

httpServer.listen(port, () => {
	logger.info(`Server listening at port: ${port}`);
});
