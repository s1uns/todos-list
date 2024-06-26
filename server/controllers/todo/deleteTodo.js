import Todo from "../../database/models/Todos.js";
import { logger } from "../../middleware/winstonLoggingMiddleware.js";
import { SOCKET_ACTION } from "../../utils/constants/socketActions.js";
import { todoDeleteAction } from "../../utils/actions/notificationActions.js";
import redisClient from "../../redisClient.js";
import socketService from "../../socket.js";

const deleteTodo = async (req, res) => {
    const { id: todoId } = req.params;
    const { socketId: authorSocketId } = req.body;
    const { userId } = req;
    const io = socketService.getIO();

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

    const connections = await redisClient.getSharedConnections(userId);
    connections.map(async (socketId) => {
        io.to(socketId).emit(
            SOCKET_ACTION,
            todoDeleteAction({
                todoId: todoId,
                socketId: authorSocketId,
            }),
        );

        logger.info(`Deleted the "${todoId}" todo from the socket ${socketId}`);
    });

    logger.info(`User ${userId} deleted a todo ${todoId}.`);
    return res.success();
};

export default deleteTodo;
