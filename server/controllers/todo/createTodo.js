import { v4 as uuid } from "uuid";
import Todo from "../../database/models/Todos.js";
import { logger } from "../../middleware/winstonLoggingMiddleware.js";
import redisClient from "../../redisClient.js";
import getUser from "../../services/user/getUser.js";
import socketService from "../../socket.js";
import { todoCreationAction } from "../../utils/actions/notificationActions.js";
import { SOCKET_ACTION } from "../../utils/constants/socketActions.js";

const createTodo = async (req, res) => {
	const { title} = req.body;
	const io = socketService.getIO();

	const userId = req.userId;
	const user = await getUser(userId);

	if (!user) {
		return res.notFound("Couldn't get the info about the user");
	}

	const newTodo = await Todo.create(
		{
			id: uuid(),
			title: title,
			creatorId: userId,
		},
		{ raw: true },
	);

	const todo = newTodo.toJSON();
	todo.author = user.fullName;

	logger.info(`User ${userId} created a new todo "${title}".`);

	const connections = await redisClient.getSharedConnections(userId);
	connections.map(async (socketId) => {
		io.to(socketId).emit(
			SOCKET_ACTION,
			todoCreationAction({
				newTodo: todo
			}),
		);
		logger.info(`Added the todo ${todo.id} on the socket ${socketId}`);
	});

	return res.success(todo);
};

export default createTodo;
