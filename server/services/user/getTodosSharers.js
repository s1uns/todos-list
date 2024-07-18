import { Op } from "sequelize";
import { Shared, Users } from "../../database/models/relations.js";
import { SHARE_ACTIVE } from "../../utils/constants/sharedStatus.js";

const getTodosSharers = async ({ offset, limit, userId, search }) => {
	const queries = {
		offset: offset,
		limit: limit,
	};
	const todosSharersIdsQuery = await Shared.findAndCountAll({
		where: {
			sharedWithId: userId,
			status: SHARE_ACTIVE,
		},
		attributes: ["ownerId"],
		raw: true,
	});

	const todosSharersIds = [
		...todosSharersIdsQuery.rows.map((row) => row.ownerId),
		userId,
	];

	const todosSharers = await Users.findAndCountAll({
		where: {
			id: {
				[Op.in]: todosSharersIds,
			},
			username: {
				[Op.like]: `%${search}%`,
			},
		},
		attributes: ["id", "username", "firstName", "lastName", "fullName"],
		...queries,
	});

	const list = todosSharers.rows.map((userInfo) => {
		return {
			id: userInfo.id,
			username: userInfo.username,
			fullName: userId === userInfo.id ? "You" : userInfo.fullName,
		};
	});

	return { list: list, totalUsers: todosSharers.count };
};

export default getTodosSharers;
