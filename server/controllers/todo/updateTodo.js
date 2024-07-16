import Todo from "../../database/models/Todos.js";
import { logger } from "../../middleware/winstonLoggingMiddleware.js";
import redisClient from "../../redisClient.js";
import socketService from "../../socket.js";
import { todoUpdateAction } from "../../utils/actions/notificationActions.js";
import { SOCKET_ACTION } from "../../utils/constants/socketActions.js";
import getUser from "../../services/user/getUser.js";

const updateTodo = async (req, res) => {
	const { id: todoId, newTitle } = req.body;
	const { userId } = req;
	const user = await getUser(userId);

	if (!user) {
		return res.notFound("Couldn't get the info about the user");
	}
	const io = socketService.getIO();

	const updatedTodo = await Todo.findByPk(todoId);

	if (!updatedTodo) {
		logger.warn(
			`User ${userId} tried to update todo ${todoId} (NOT FOUND) with new title "${newTitle}".`,
		);
		return res.notFound("Todo not found.");
	}

	if (updatedTodo.creatorId != userId) {
		logger.warn(
			`User ${userId} tried to update not his todo ${todoId} with new title "${newTitle}".`,
		);
		return res.forbidden("It's not your todo.");
	}

	updatedTodo.title = newTitle;
	updatedTodo.isUpdated = true;

	updatedTodo.save();
	logger.info(
		`User ${userId} updated todo ${todoId} with new title "${newTitle}".`,
	);

	const todo = updatedTodo.toJSON();
	todo.author = user.fullName;

	const connections = await redisClient.getSharedConnections(userId);
	connections.map(async (socketId) => {
		io.to(socketId).emit(
			SOCKET_ACTION,
			todoUpdateAction({
				newTodo: { ...todo },
			}),
		);
		logger.info(
			`Updated the "${updatedTodo.title}" on the socket ${socketId}`,
		);
	});

	return res.success(todo);
};

export default updateTodo;
