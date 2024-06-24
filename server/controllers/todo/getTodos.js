import { getTodos as getTodosAsync } from "../../services/todos/index.js";
import { logger } from "../../middleware/winstonLoggingMiddleware.js";

const getTodos = async (req, res) => {
    const { page, limit, filter } = req.query;

    const userId = req.userId;

    const todos = await getTodosAsync({
        page: +page ? +page : 1,
        limit: +limit ? +limit : 4,
        userId: userId,
        filter: +filter ? +filter : 0,
    });

    logger.info(
        `User ${userId} returned a list of his todos. Page: ${page}. Limit: ${limit}.`,
    );
    return res.success(todos);
};

export default getTodos;
