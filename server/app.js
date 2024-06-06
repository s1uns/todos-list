// import { migrate } from "./migrations/migrationsManager.js";
// const { userRoutes } = require("./routes/userRoutes/userRoutes.js");
// const { todosRoutes } = require("./routes/todosRoutes/todosRoutes.js");
import { router as authRouter } from "./routes/auth/index.js";
import express from "express";
import reqTimeMiddleware from "./middleware/reqTimeMiddleware.js";
import responseMiddleware from "./middleware/responseMiddleware.js";

const app = express();
app.use(express.json());

const port = process.env.SERVER_PORT;

app.use(reqTimeMiddleware, responseMiddleware);

app.get("/", (req, res) => {
    res.send("Started Working, Express!");
});

app.use("/auth", authRouter);
// app.use("/todos", todosRoutes);
// app.use("/user", userRoutes);

app.listen(port, () => {
    console.log(`Server listening at port: ${port}`);
});
