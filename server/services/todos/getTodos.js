import { Op } from "sequelize";
import { Shared, Todos, Users } from "../../database/models/relations.js";
import {
	FILTER_ACTIVE,
	FILTER_COMPLETED,
} from "../../utils/constants/filter.js";
import { SHARE_ACTIVE } from "../../utils/constants/sharedStatus.js";
import {
	SORT_CREATED_AT,
	SORT_TITLE,
	SORT_UPDATED_AT,
} from "../../utils/constants/sortBy.js";

const getTodos = async ({
	page,
	limit,
	userId,
	filter,
	search,
	sortBy,
	isAscending,
}) => {
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

	const sortingStatement = {};

	if (sortBy === SORT_CREATED_AT) {
		sortingStatement.sortBy = "createdAt";
	}

	if (sortBy === SORT_UPDATED_AT) {
		sortingStatement.sortBy = "updatedAt";
	}

	if (sortBy === SORT_TITLE) {
		sortingStatement.sortBy = "title";
	}

	console.log("Is ascending: ", isAscending);

	sortingStatement.order = isAscending ? "ASC" : "DESC";

	console.log("Sorting: ", sortingStatement);

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
		order: [[sortingStatement.sortBy, sortingStatement.order]],
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
