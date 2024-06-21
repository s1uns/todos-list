import Todo from "../../database/models/Todos.js";
import { getTodos } from "../../services/todos/index.js";

const clearCompleted = async (req, res) => {
    const { userId } = req;

    await Todo.destroy({
        where: { creatorId: userId, isCompleted: true },
    });

    const todos = await getTodos({page: 1, limit: 4, userId: userId});

    return res.success(todos);
};

export default clearCompleted;
