import { Op } from "sequelize";
import { Shared, Users } from "../../database/models/relations.js";
import { SHARE_ACTIVE } from "../../utils/constants/sharedStatus.js";

const getAvailableUsers = async ({ page, limit, userId, search }) => {
	const queries = {
		offset: (page - 1) * limit,
		limit: limit,
	};

	const availableUsers = await Users.findAndCountAll({
		where: {
			id: {
				[Op.not]: userId,
			},
			username: {
				[Op.like]: `%${search}%`,
			},
		},
		attributes: ["id", "username", "firstName", "lastName", "fullName"],
		include: {
			model: Shared,
			as: "sharedWith",
			attributes: ["ownerId", "status"],
		},
		...queries,
	});

	const usersCount = await Users.count({
		where: {
			id: {
				[Op.not]: userId,
			},
			username: {
				[Op.like]: `%${search}%`,
			},
		},
	});
	const list = availableUsers.rows.map((userInfo) => {
		const usersSharedWith = JSON.parse(JSON.stringify(userInfo.sharedWith));

		const shareStatus = usersSharedWith.filter(
			(connection) =>
				connection.ownerId === userId &&
				+connection.status === SHARE_ACTIVE,
		).length;

		return {
			id: userInfo.id,
			username: userInfo.username,
			fullName: userInfo.fullName,
			isShared: shareStatus,
		};
	});

	const totalPages = Math.ceil(usersCount / limit);

	return { list: list, totalPages: totalPages };
};

export default getAvailableUsers;
