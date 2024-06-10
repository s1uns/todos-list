import { router as authRouter } from "./routes/auth/index.js";
import { router as todosRouter } from "./routes/todos/index.js";
import express from "express";
import cookieParser from "cookie-parser";
import authMiddleware from "./middleware/authMiddleware.js";
import reqTimeMiddleware from "./middleware/reqTimeMiddleware.js";
import responseMiddleware from "./middleware/responseMiddleware.js";
import cors from "cors";

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(express.json());
app.use(cookieParser());

app.use(reqTimeMiddleware, responseMiddleware);

const port = process.env.SERVER_PORT;

app.get("/", (req, res) => {
    res.send("Started Working, Express!");
});

app.use("/auth", authRouter);
app.use("/todos", todosRouter);
// app.use("/user", userRoutes);

app.listen(port, () => {
    console.log(`Server listening at port: ${port}`);
});
