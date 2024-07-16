import Todo from "../../database/models/Todos.js";
import { logger } from "../../middleware/winstonLoggingMiddleware.js";
import redisClient from "../../redisClient.js";
import getUser from "../../services/user/getUser.js";
import socketService from "../../socket.js";
import { todoClearCompletedAction } from "../../utils/actions/notificationActions.js";
import { SOCKET_ACTION } from "../../utils/constants/socketActions.js";

const clearCompleted = async (req, res) => {
	const io = socketService.getIO();

	const { userId } = req;
	const user = await getUser(userId);

	await Todo.destroy({
		where: { creatorId: userId, isCompleted: true },
	});

	// const todos = await getTodos({
	// 	page: 1,
	// 	limit: TODOS_LIMIT,
	// 	userId: userId,
	// 	filter: FILTER_ALL,
	// 	search: "",
	// });

	logger.info(`User ${userId} cleared completed todos.`);

	const connections = await redisClient.getSharedConnections(userId);
	connections.map(async (socketId) => {
		io.to(socketId).emit(
			SOCKET_ACTION,
			todoClearCompletedAction({
				userId: userId,
				author: user.fullName,
			}),
		);
		logger.info(
			`Cleared all the completed todos of the user ${userId} on the socket ${socketId}`,
		);
	});
	return res.success("Successfully cleared your completed todos!");
};

export default clearCompleted;
