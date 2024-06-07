// import { migrate } from "./migrations/migrationsManager.js";
// const { userRoutes } = require("./routes/userRoutes/userRoutes.js");
// const { todosRoutes } = require("./routes/todosRoutes/todosRoutes.js");
import { router as authRouter } from "./routes/auth/index.js";
import express from "express";
import reqTimeMiddleware from "./middleware/reqTimeMiddleware.js";
import responseMiddleware from "./middleware/responseMiddleware.js";
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json());

app.use(reqTimeMiddleware, responseMiddleware);

const port = process.env.SERVER_PORT;

app.get("/", (req, res) => {
    res.send("Started Working, Express!");
});

app.use("/auth", authRouter);
// app.use("/todos", todosRoutes);
// app.use("/user", userRoutes);

app.listen(port, () => {
    console.log(`Server listening at port: ${port}`);
});
