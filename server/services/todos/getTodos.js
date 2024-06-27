import { Users, Todos, Shared } from "../../database/models/relations.js";
import { Op } from "sequelize";
import { SHARE_ACTIVE } from "../../utils/constants/sharedStatus.js";

const getTodos = async ({ page, limit, userId, filter }) => {
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
