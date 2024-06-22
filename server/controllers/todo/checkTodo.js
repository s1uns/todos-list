import Todo from "../../database/models/Todos.js";
import { logger } from "../../middleware/winstonLoggingMiddleware.js";

const checkTodo = async (req, res) => {
    const { id: todoId } = req.params;
    const { userId } = req;

    const todo = await Todo.findByPk(todoId);

    if (!todo) {
        logger.warn(
            `User ${userId} tried to update the completion status of todo ${todoId} (NOT FOUND).`,
        );
        return res.notFound("Todo not found.");
    }

    if (todo.creatorId != userId) {
        logger.warn(
            `User ${userId} tried to update the completion status of not his todo ${todoId}.`,
        );
        return res.forbidden("It's not your todo.");
    }

    todo.isCompleted = !todo.isCompleted;
    todo.save();

    logger.info(
        `User ${userId} updated the completion status of todo ${todoId} to "${todo.isCompleted}".`,
    );

    return res.success(todo);
};

export default checkTodo;
