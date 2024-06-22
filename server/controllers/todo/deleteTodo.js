import Todo from "../../database/models/Todos.js";
import { logger } from "../../middleware/winstonLoggingMiddleware.js";

const deleteTodo = async (req, res) => {
    const { id: todoId } = req.params;
    const { userId } = req;

    const todo = await Todo.findByPk(todoId);

    if (!todo) {
        logger.warn(
            `User ${userId} tried to delete todo ${todoId} (NOT FOUND)".`,
        );
        return res.notFound("Todo not found.");
    }

    if (todo.creatorId != userId) {
        logger.warn(`User ${userId} tried to delete not his todo ${todoId}".`);
        return res.forbidden("It's not your todo.");
    }

    await todo.destroy({
        where: {
            id: todoId,
        },
    });

    logger.info(`User ${userId} deleted a todo ${todoId}.`);
    return res.success();
};

export default deleteTodo;
