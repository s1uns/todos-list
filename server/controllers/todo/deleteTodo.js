import Todo from "../../database/models/Todos.js";
import { logger } from "../../middleware/winstonLoggingMiddleware.js";
import redisClient from "../../redisClient.js";
import getUser from "../../services/user/getUser.js";
import socketService from "../../socket.js";
import { todoDeleteAction } from "../../utils/actions/notificationActions.js";
import { SOCKET_ACTION } from "../../utils/constants/socketActions.js";

const deleteTodo = async (req, res) => {
	const { id: todoId } = req.params;
	const { userId } = req;
	const io = socketService.getIO();
	const user = await getUser(userId);

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

	const connections = await redisClient.getSharedConnections(userId);
	connections.map(async (socketId) => {
		io.to(socketId).emit(
			SOCKET_ACTION,
			todoDeleteAction({
				todoId: todoId,
				author: user.fullName,
				creatorId: todo.creatorId,
			}),
		);

		logger.info(`Deleted the todo ${todoId} on the socket ${socketId}`);
	});

	return res.success();
};

export default deleteTodo;
