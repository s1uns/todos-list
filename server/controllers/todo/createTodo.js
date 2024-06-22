import Todo from "../../database/models/Todos.js";
import { v4 as uuid } from "uuid";
import { logger } from "../../middleware/winstonLoggingMiddleware.js";

const createTodo = async (req, res) => {
    const { title } = req.body;

    const userId = req.userId;

    const newTodo = await Todo.create({
        id: uuid(),
        title: title,
        creatorId: userId,
    });

    logger.info(`User ${userId} created a new todo "${title}".`);
    return res.success(newTodo);
};

export default createTodo;
