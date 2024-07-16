import Todo from "../../database/models/Todos.js";
import { logger } from "../../middleware/winstonLoggingMiddleware.js";
import redisClient from "../../redisClient.js";
import getUser from "../../services/user/getUser.js";
import socketService from "../../socket.js";
import { todoCheckAction } from "../../utils/actions/notificationActions.js";
import { SOCKET_ACTION } from "../../utils/constants/socketActions.js";

const checkTodo = async (req, res) => {
	const { id: todoId } = req.params;
	const io = socketService.getIO();
	const { userId } = req;
	const user = await getUser(userId);

	const checkedTodo = await Todo.findByPk(todoId);

	if (!checkedTodo) {
		logger.warn(
			`User ${userId} tried to update the completion status of todo ${todoId} (NOT FOUND).`,
		);
		return res.notFound("Todo not found.");
	}

	if (checkedTodo.creatorId != userId) {
		logger.warn(
			`User ${userId} tried to update the completion status of not his todo ${todoId}.`,
		);
		return res.forbidden("It's not your todo.");
	}

	checkedTodo.isCompleted = !checkedTodo.isCompleted;
	checkedTodo.save();

	const todo = checkedTodo.toJSON();
	todo.author = user.fullName;

	logger.info(
		`User ${userId} updated the completion status of todo ${todoId} to "${todo.isCompleted}".`,
	);

	const connections = await redisClient.getSharedConnections(userId);
	connections.map(async (socketId) => {
		io.to(socketId).emit(
			SOCKET_ACTION,
			todoCheckAction({
				newTodo: { ...todo }
			}),
		);
		logger.info(`Checked the todo ${todo.id} on the socket ${socketId}`);
	});
	return res.success(todo);
};

export default checkTodo;
