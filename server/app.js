import { router as authRouter } from "./routes/auth/index.js";
import { router as todosRouter } from "./routes/todos/index.js";
import express from "express";
import cookieParser from "cookie-parser";
import reqTimeMiddleware from "./middleware/reqTimeMiddleware.js";
import responseMiddleware from "./middleware/responseMiddleware.js";
import cors from "cors";
import sequelize from "./database/models/index.js";

// share unshare
// yup validation
// user-sheet

const app = express();

const origin = process.env.CORS_ORIGIN;
app.use(cors({ credentials: true, origin: origin }));

app.use(express.json());
app.use(cookieParser());

app.use(reqTimeMiddleware, responseMiddleware);

const port = process.env.SERVER_PORT;
console.log("Models: ", sequelize.models);



app.get("/", (req, res) => {
    res.send("Started Working, Express!");
});

app.use("/auth", authRouter);
app.use("/todos", todosRouter);

app.listen(port, () => {
    console.log(`Server listening at port: ${port}`);
});
