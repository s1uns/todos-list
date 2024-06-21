import { getTodos as getTodosAsync } from "../../services/todos/index.js";

const getTodos = async (req, res) => {
    //merge to one query, add pagination
    const { page, limit } = req.query;

    const userId = req.userId;

    if (!userId) {
        return res.notFound("Couldn't get the user's id");
    }

    const todos = await getTodosAsync({
        page: +page ? +page : 1,
        limit: +limit ? +limit : 4,
        userId: userId,
    });

    return res.success(todos);
};

export default getTodos;
