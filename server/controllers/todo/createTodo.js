import Todo from "../../database/models/Todos.js";
import { v4 as uuid } from "uuid";
import { logger } from "../../middleware/winstonLoggingMiddleware.js";
import socketService from "../../socket.js";
import { SOCKET_TODO_CREATION } from "../../utils/constants/socketActions.js";
import { todoCreationAction } from "../../utils/actions/notificationActions.js";
import getUser from "../../services/user/getUser.js";
import redisClient from "../../redisClient.js";

const createTodo = async (req, res) => {
    const { title } = req.body;
    const io = socketService.getIO();

    const userId = req.userId;

    const newTodo = await Todo.create({
        id: uuid(),
        title: title,
        creatorId: userId,
        isAuthor: true,
    });

    logger.info(`User ${userId} created a new todo "${title}".`);
    const user = await getUser(userId);

    if (!user) {
        return res.notFound("Couldn't get the info about the user");
    }

    return res.success(newTodo);
};

export default createTodo;
