import { raw } from "mysql";
import { Users, Todos, Shared } from "../../database/models/relations.js";
import { mapOwnTodos, mapSharedTodos } from "../../services/todos/index.js";

const getTodos = async (req, res) => {
    //merge to one query, add pagination

    const userId = req.userId;

    if (!userId) {
        return res.notFound("Couldn't get the user's id");
    }

    const unmappedOwnTodos = await Todos.findAll({
        where: { creatorId: userId },
        include: [
            {
                model: Users,
                as: "creator",
                attributes: ["id", "fullName"],
            },
        ],
        raw: true,
        nest: true,
    });

    const ownTodos = await mapOwnTodos(unmappedOwnTodos);

    const unmappedSharedTodos = await Shared.findAll({
        where: { sharedWithId: userId },
        attributes: [],

        include: {
            model: Users,
            as: "owner",
            attributes: ["id", "fullName"],
            include: { model: Todos, as: "todo" },
        },
        raw: true,
        nest: true,
    });

    const sharedTodos = await mapSharedTodos(unmappedSharedTodos);

    return res.success([...ownTodos, ...sharedTodos]);
};

export default getTodos;
