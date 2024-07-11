import Todo from "../../database/models/Todos.js";
import { logger } from "../../middleware/winstonLoggingMiddleware.js";
import redisClient from "../../redisClient.js";
import { getTodos } from "../../services/todos/index.js";
import socketService from "../../socket.js";
import { todoClearCompletedAction } from "../../utils/actions/notificationActions.js";
import { FILTER_ALL } from "../../utils/constants/filter.js";
import { SOCKET_ACTION } from "../../utils/constants/socketActions.js";
import { TODOS_LIMIT } from "../../utils/constants/todos.js";

const clearCompleted = async (req, res) => {
	const { socketId: authorSocketId } = req.body;
	const io = socketService.getIO();

	const { userId } = req;

	await Todo.destroy({
		where: { creatorId: userId, isCompleted: true },
	});

	const todos = await getTodos({
		page: 1,
		limit: TODOS_LIMIT,
		userId: userId,
		filter: FILTER_ALL,
		search: "",
	});

	logger.info(`User ${userId} cleared completed todos.`);

	const connections = await redisClient.getSharedConnections(userId);
	connections.map(async (socketId) => {
		io.to(socketId).emit(
			SOCKET_ACTION,
			todoClearCompletedAction({ socketId: authorSocketId }),
		);
		logger.info(
			`Cleared all the completed todos of the user ${userId} on the socket ${socketId}`,
		);
	});
	return res.success(todos);
};

export default clearCompleted;
