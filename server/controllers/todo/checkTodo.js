import Todo from "../../database/models/todo.js";
const checkTodo = async (req, res) => {
    console.log(`The /check-todo request was catched at ${req.requestTime}`);
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

    console.log(
        `The /check-todo response was returned at ${res.getResponseTime()}`,
    );

    return res.success(todo);
};

export default checkTodo;
