import {
    checkTodo as checkTodoAsync,
    getTodo,
} from "../../models/todos/index.js";

const checkTodo = async (req, res) => {
    console.log(`The /check-todo request was catched at ${req.requestTime}`);

    console.log("Params: ", req.params);

    const { id: todoId } = req.params;

    console.log("TodoId = ", todoId);
    const { userId } = req;

    console.log("UserId = ", userId);

    const todo = await getTodo(todoId);

    if (!todo) {
        return res.notFound("Todo not found.");
    }

    if (todo.userId != userId) {
        return res.forbidden("It's not your todo");
    }

    const checkedTodo = await checkTodoAsync(todoId);

    console.log(
        `The /check-todo response was returned at ${res.getResponseTime()}`,
    );

    return res.success(checkedTodo);
};

export default checkTodo;
