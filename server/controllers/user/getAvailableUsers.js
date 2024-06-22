import { logger } from "../../middleware/winstonLoggingMiddleware.js";
import { getAvailableUsers as getAvailableUsersAsync } from "../../services/user/index.js";

const getAvailableUsers = async (req, res) => {
    const userId = req.userId;
    const { page, limit } = req.query;

    const result = await getAvailableUsersAsync({
        page: +page ? +page : 1,
        limit: +limit ? +limit : 3,
        userId: userId,
    });

    logger.info(
        `User ${userId} returned a list of available users. Page: ${page}. Limit: ${limit}.`,
    );
    return res.success(result);
};

export default getAvailableUsers;
