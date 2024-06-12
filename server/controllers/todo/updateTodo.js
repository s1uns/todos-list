import {
    updateTodo as updateTodoAsync,
    getTodo,
} from "../../models/todos/index.js";

const updateTodo = async (req, res) => {
    console.log(`The /update-todo request was catched at ${req.requestTime}`);

    const { id: todoId, newTitle } = req.body;
    const { userId } = req;

    const todo = await getTodo(todoId);

    if (!todo) {
        return res.notFound("Todo not found.");
    }

    if (todo.userId != userId) {
        return res.forbidden("It's not your todo");
    }

    const updatedTodo = await updateTodoAsync(todoId, newTitle);

    console.log(
        `The /update-todo response was returned at ${res.getResponseTime()}`,
    );

    return res.success(updatedTodo);
};

export default updateTodo;
