import { router as authRouter } from "./routes/auth/index.js";
import { router as todosRouter } from "./routes/todos/index.js";
import { router as sharedRouter } from "./routes/shared/index.js";
import { router as userRouter } from "./routes/user/index.js";
import express from "express";
import cookieParser from "cookie-parser";
import reqTimeMiddleware from "./middleware/reqTimeMiddleware.js";
import responseMiddleware from "./middleware/responseMiddleware.js";
import cors from "cors";
import expressWinston from "express-winston";
import { logger, errorLogger } from "./middleware/winstonLoggingMiddleware.js";

// yup validation
// user-sheet

const app = express();

const origin = process.env.CORS_ORIGIN;
app.use(cors({ credentials: true, origin: origin }));

app.use(express.json());
app.use(cookieParser());
app.use(logger);
app.use(reqTimeMiddleware, responseMiddleware);

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
    console.log(`Server listening at port: ${port}`);
});
