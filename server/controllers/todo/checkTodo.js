import Todo from "../../database/models/Todos.js";
const checkTodo = async (req, res) => {
    const { id: todoId } = req.params;
    const { userId } = req;

    const todo = await Todo.findByPk(todoId);

    if (!todo) {
        return res.notFound("Todo not found.");
    }

    if (todo.creatorId != userId) {
        return res.forbidden("It's not your todo");
    }

    todo.isCompleted = !todo.isCompleted;
    todo.save();

    return res.success(todo);
};

export default checkTodo;
