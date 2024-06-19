import { router as authRouter } from "./routes/auth/index.js";
import { router as todosRouter } from "./routes/todos/index.js";
import express from "express";
import cookieParser from "cookie-parser";
import reqTimeMiddleware from "./middleware/reqTimeMiddleware.js";
import responseMiddleware from "./middleware/responseMiddleware.js";
import cors from "cors";
import sequelize from "./database/models/index.js";
import User from "./database/models/user.js";
import Shared from "./database/models/Shared.js";
import Todo from "./database/models/todo.js";

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


try {
    User.hasMany(Todo, { as: "todos", foreignKey: "creatorId" });

    Todo.belongsTo(User, { as: "creator", foreignKey: "creatorId" });

    Shared.belongsTo(User, { foreignKey: "ownerId" });
    Shared.belongsTo(User, { foreignKey: "sharedWithId" });

    await sequelize.sync();
    console.log(sequelize.models.User.associations);
    console.log("Connection has been established successfully.");
} catch (error) {
    console.error("Unable to connect to the database:", error);
}

app.get("/", (req, res) => {
    res.send("Started Working, Express!");
});

app.use("/auth", authRouter);
app.use("/todos", todosRouter);

app.listen(port, () => {
    console.log(`Server listening at port: ${port}`);
});
