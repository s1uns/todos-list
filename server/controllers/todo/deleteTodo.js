import {
    deleteTodo as deleteTodoAsync,
    isUserAuthor,
    todoExists,
} from "../../models/todos/index.js";

const deleteTodo = async (req, res) => {
    console.log(`The /delete-todo request was catched at ${req.requestTime}`);

    const { id: todoId } = req.params;
    const { userId } = req;

    const exists = await todoExists(todoId);

    if (!exists) {
        return res.notFound("Todo not found.");
    }

    const isAuthor = await isUserAuthor(todoId, userId);

    if (!isAuthor) {
        return res.forbidden("Not your todo!");
    }

    await deleteTodoAsync(todoId);

    console.log(
        `The /delete-todo response was returned at ${res.getResponseTime()}`,
    );

    return res.success();
};

export default deleteTodo;
