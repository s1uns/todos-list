import { Op } from "sequelize";
import { Shared, Todos, Users } from "../../database/models/relations.js";
import { SHARE_ACTIVE } from "../../utils/constants/sharedStatus.js";
import { FILTER_ACTIVE, FILTER_COMPLETED } from "../../utils/constants/filter.js";

const getTodos = async ({ page, limit, userId, filter, search }) => {
	const queries = {
		offset: (page - 1) * limit,
		limit: limit,
	};

	const sharedTodosOwners = (
		await Shared.findAll({
			where: { sharedWithId: userId, status: SHARE_ACTIVE },
			attributes: ["ownerId"],
			raw: true,
		})
	).map((owner) => owner.ownerId);

	const whereStatement = {
		creatorId: {
			[Op.in]: [...sharedTodosOwners, userId],
		},
		title: {
			[Op.like]: `%${search}%`,
		},
	};

	if (filter === FILTER_ACTIVE) {
		whereStatement.isCompleted = false;
	} else if (filter === FILTER_COMPLETED) {
		whereStatement.isCompleted = true;
	}

	console.log("Search: ", search);

	const activeTodos = await Todos.count({
		where: {
			creatorId: {
				[Op.in]: [...sharedTodosOwners, userId],
			},
			isCompleted: false,
		},
	});

	const todos = await Todos.findAndCountAll({
		where: whereStatement,

		include: {
			model: Users,
			as: "creator",
			attributes: ["id", "firstName", "lastName"],
		},
		raw: true,
		nest: true,
		order: [["createdAt", "DESC"]],
		...queries,
	});

	const list = todos.rows.map((todo) => {
		const { creator, ...rest } = todo;

		return {
			author: `${creator.firstName} ${creator.lastName}`,
			...rest,
		};
	});

	return {
		list: list,
		totalTodos: todos.count,
		activeTodos: activeTodos,
	};
};

export default getTodos;
