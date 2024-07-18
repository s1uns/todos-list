import { logger } from "../../middleware/winstonLoggingMiddleware.js";
import { getTodos as getTodosAsync } from "../../services/todos/index.js";
import { SORT_CREATED_AT } from "../../utils/constants/sortBy.js";

const getTodos = async (req, res) => {
	const { offset, limit, filter, search, sortBy, isAscending, sharers } =
		req.query;
	console.log("Query: ", req.query);
	console.log("User id: ", req.userId);
	const userId = req.userId;

	const todos = await getTodosAsync({
		offset: +offset ? +offset : 0,
		limit: +limit ? +limit : 10,
		userId: userId,
		filter: +filter ? +filter : 0,
		search: search ? search : "",
		sortBy: +sortBy ? +sortBy : SORT_CREATED_AT,
		isAscending: isAscending ? isAscending : false,
		sharers: sharers ? sharers : null,
	});

	logger.info(
		`User ${userId} returned a list of his todos. Offset: ${offset}. Limit: ${limit}.`,
	);
	return res.success(todos);
};

export default getTodos;
