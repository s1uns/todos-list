import Todo from "../../database/models/todo.js";

const updateTodo = async (req, res) => {
    console.log(`The /update-todo request was catched at ${req.requestTime}`);

    const { id: todoId, newTitle } = req.body;
    const { userId } = req;

    const todo = await Todo.findByPk(todoId);

    if (!todo) {
        return res.notFound("Todo not found.");
    }

    if (todo.creatorId != userId) {
        return res.forbidden("It's not your todo");
    }

    todo.title = newTitle;
    todo.isUpdated = true;
    // const updatedTodo = await updateTodoAsync(todoId, newTitle);

    todo.save();
    console.log(
        `The /update-todo response was returned at ${res.getResponseTime()}`,
    );

    return res.success(todo);
};

export default updateTodo;
