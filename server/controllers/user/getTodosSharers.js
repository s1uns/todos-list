import { logger } from "../../middleware/winstonLoggingMiddleware.js";
import { getTodosSharers as getTodosSharersAsync } from "../../services/user/index.js";

const getTodosSharers = async (req, res) => {
	const userId = req.userId;
	const { offset, limit, search } = req.query;

	const result = await getTodosSharersAsync({
		offset: +offset ? +offset : 0,
		limit: +limit ? +limit : 6,
		search: search ? search : "",
		userId: userId,
	});

	logger.info(
		`User ${userId} returned a list of his todos sharers. Offset: ${offset}. Limit: ${limit}.`,
	);
	return res.success(result);
};

export default getTodosSharers;
