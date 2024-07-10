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
		include: { model: Shared, as: "sharedWith", attributes: ["status"] },
		...queries,
	});

	const list = availableUsers.rows.map((userInfo) => {
		const shareStatus =
			!!userInfo.sharedWith[0] &&
			+userInfo.sharedWith[0].status === SHARE_ACTIVE
				? true
				: false;

		return {
			id: userInfo.id,
			username: userInfo.username,
			fullName: userInfo.fullName,
			isShared: shareStatus,
		};
	});

	const totalPages = Math.ceil(availableUsers?.count / limit);

	return { list: list, totalPages: totalPages };
};

export default getAvailableUsers;
