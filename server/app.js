import { router as authRouter } from "./routes/auth/index.js";
import { router as todosRouter } from "./routes/todos/index.js";
import { router as sharedRouter } from "./routes/shared/index.js";
import { router as userRouter } from "./routes/user/index.js";
import express from "express";
import cookieParser from "cookie-parser";
import responseMiddleware from "./middleware/responseMiddleware.js";
import cors from "cors";
import { logger, errorLogger } from "./middleware/winstonLoggingMiddleware.js";
import expressWinston from "express-winston";

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
    }),
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



app.listen(port, () => {
    logger.info(`Server listening at port: ${port}`);
});
