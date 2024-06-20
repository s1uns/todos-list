import Todo from "../../database/models/Todos.js";

const clearCompleted = async (req, res) => {

    const { userId } = req;

    await Todo.destroy({
        where: { creatorId: userId, isCompleted: true },
    });

    const todos = await Todo.findAll({
        where: { creatorId: userId },
    });

    return res.success(todos);
};

export default clearCompleted;
