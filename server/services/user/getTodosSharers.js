import { Shared, Users } from "../../database/models/relations.js";
import { SHARE_ACTIVE } from "../../utils/constants/sharedStatus.js";
import getUser from "./getUser.js";

const getTodosSharers = async ({ offset, limit, userId, search }) => {
	const queries = {
		offset: offset,
		limit: limit,
	};
	const todosSharers = await Shared.findAndCountAll({
		where: {
			sharedWithId: userId,
			status: SHARE_ACTIVE,
		},
		attributes: [],
		include: {
			model: Users,
			as: "owner",
			attributes: ["id", "firstName", "lastName", "username", "fullName"],
		},
		order: [["updatedAt", "ASC"]],
	});
	const user = await getUser(userId);

	const list = todosSharers.rows.map((userInfo) => {
		const { id, username, fullName } = JSON.parse(
			JSON.stringify(userInfo),
		).owner;
		return {
			id: id,
			username: username,
			fullName: userId === id ? "You" : fullName,
		};
	});

	return {
		list: [
			{ id: userId, username: user.username, fullName: "You" },
			...list,
		],
		totalUsers: todosSharers.count + 1,
	};
};

export default getTodosSharers;
