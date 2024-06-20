import { raw } from "mysql";
import { Users, Todos, Shared } from "../../database/models/relations.js";
import { mapOwnTodos, mapSharedTodos } from "../../services/todos/index.js";

const getTodos = async (req, res) => {
    console.log(`The /get-todos request was catched at ${req.requestTime}`);

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
                attributes: ["id", "firstName", "lastName"],
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
            attributes: ["id", "firstName", "lastName"],
            include: { model: Todos, as: "todo" },
        },
        raw: true,
        nest: true,
    });

    const sharedTodos = await mapSharedTodos(unmappedSharedTodos);

    console.log(
        `The /get-todos response was returned at ${res.getResponseTime()}`,
    );

    return res.success([...ownTodos, ...sharedTodos]);
};

export default getTodos;
