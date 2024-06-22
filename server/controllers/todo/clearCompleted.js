import Todo from "../../database/models/Todos.js";
import { getTodos } from "../../services/todos/index.js";
import { logger } from "../../middleware/winstonLoggingMiddleware.js";

const clearCompleted = async (req, res) => {
    const { userId } = req;

    await Todo.destroy({
        where: { creatorId: userId, isCompleted: true },
    });

    const todos = await getTodos({ page: 1, limit: 4, userId: userId });

    logger.info(`User ${userId} cleared completed todos.`);
    return res.success(todos);
};

export default clearCompleted;
