import Todo from "../../database/models/Todos.js";

const deleteTodo = async (req, res) => {
    console.log(`The /delete-todo request was catched at ${req.requestTime}`);

    const { id: todoId } = req.params;
    const { userId } = req;

    const todo = await Todo.findByPk(todoId);

    if (!todo) {
        return res.notFound("Todo not found.");
    }

    if (todo.creatorId != userId) {
        return res.forbidden("It's not your todo");
    }

    await todo.destroy({
        where: {
            id: todoId,
        },
    });

    console.log(
        `The /delete-todo response was returned at ${res.getResponseTime()}`,
    );

    return res.success();
};

export default deleteTodo;
