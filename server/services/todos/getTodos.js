import { Users, Todos, Shared } from "../../database/models/relations.js";
import { Op } from "sequelize";
import { SHARE_ACTIVE } from "../../utils/constraints/sharedStatus.js";

const getTodos = async ({ page, limit, userId, filter }) => {
    //add filter by status
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
    };

    if (filter === 1) {
        whereStatement.isCompleted = false;
    } else if (filter === 2) {
        whereStatement.isCompleted = true;
    }

    const todos = await Todos.findAndCountAll({
        where: whereStatement,
        include: {
            model: Users,
            as: "creator",
            attributes: ["id", "firstName", "lastName"],
        },
        raw: true,
        nest: true,
        ...queries,
    });

    const list = todos.rows.map((todo) => {
        const { creator, ...rest } = todo;

        return {
            author: `${creator.firstName} ${creator.lastName}`,
            isAuthor: creator.id === userId,
            ...rest,
        };
    });

    const totalPages = Math.ceil(todos?.count / limit);

    return { list: list, totalPages: totalPages, count: todos?.count };
};

export default getTodos;
