import { logger } from "../../middleware/winstonLoggingMiddleware.js";
import { getTodos as getTodosAsync } from "../../services/todos/index.js";
import { SORT_CREATED_AT } from "../../utils/constants/sortBy.js";

const getTodos = async (req, res) => {
	const { page, limit, filter, search, sortBy, isAscending } = req.query;
	const userId = req.userId;

	const todos = await getTodosAsync({
		page: +page ? +page : 1,
		limit: +limit ? +limit : 4,
		userId: userId,
		filter: +filter ? +filter : 0,
		search: search ? search : "",
		sortBy: +sortBy ? +sortBy : SORT_CREATED_AT,
		isAscending: isAscending ? isAscending : false,
	});

	logger.info(
		`User ${userId} returned a list of his todos. Page: ${page}. Limit: ${limit}.`,
	);
	return res.success(todos);
};

export default getTodos;
