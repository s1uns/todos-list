import Todos from "../../database/models/Todos.js";
import { Users } from "../../database/models/relations.js";

const getTodos = async (req, res) => {
    console.log(`The /get-todos request was catched at ${req.requestTime}`);

    const userId = req.userId;

    if (!userId) {
        return res.notFound("Couldn't get the user's id");
    }

    const todos = await Todos.findAll({
        where: { creatorId: userId },
        include: [{ model: Users, as: "creator" }],
    });

    console.log(
        `The /get-todos response was returned at ${res.getResponseTime()}`,
    );

    return res.success(todos);
};

export default getTodos;
