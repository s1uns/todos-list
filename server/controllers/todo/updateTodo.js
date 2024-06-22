import { logger } from "../../middleware/winstonLoggingMiddleware.js";
import Todo from "../../database/models/Todos.js";

const updateTodo = async (req, res) => {
    const { id: todoId, newTitle } = req.body;
    const { userId } = req;

    const todo = await Todo.findByPk(todoId);

    if (!todo) {
        logger.warn(
            `User ${userId} tried to update todo ${todoId} (NOT FOUND) with new title "${newTitle}".`,
        );
        return res.notFound("Todo not found.");
    }

    if (todo.creatorId != userId) {
        logger.warn(
            `User ${userId} tried to update not his todo ${todoId} with new title "${newTitle}".`,
        );
        return res.forbidden("It's not your todo.");
    }

    todo.title = newTitle;
    todo.isUpdated = true;

    todo.save();
    logger.info(
        `User ${userId} updated todo ${todoId} with new title "${newTitle}".`,
    );

    return res.success(todo);
};

export default updateTodo;
