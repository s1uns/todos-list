import {
    deleteTodo as deleteTodoAsync,
    getTodo,
} from "../../models/todos/index.js";

const deleteTodo = async (req, res) => {
    console.log(`The /delete-todo request was catched at ${req.requestTime}`);

    const { id: todoId } = req.params;
    const { userId } = req;

    const todo = await getTodo(todoId);

    if (!todo) {
        return res.notFound("Todo not found.");
    }

    if (todo.userId != userId) {
        return res.forbidden("It's not your todo");
    }

    await deleteTodoAsync(todoId);

    console.log(
        `The /delete-todo response was returned at ${res.getResponseTime()}`,
    );

    return res.success();
};

export default deleteTodo;
