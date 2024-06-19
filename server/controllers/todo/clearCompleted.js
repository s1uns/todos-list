import Todo from "../../database/models/todo.js";

const clearCompleted = async (req, res) => {
    console.log(
        `The /clear-completed request was catched at ${req.requestTime}`,
    );

    const { userId } = req;

    await Todo.destroy({
        where: { creatorId: userId, isCompleted: true },
    });

    const todos = await Todo.findAll({
        where: { creatorId: userId },
    });

    console.log(
        `The /clear-completed response was returned at ${res.getResponseTime()}`,
    );

    return res.success(todos);
};

export default clearCompleted;
