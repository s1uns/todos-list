import {
    checkTodo as checkTodoAsync,
    isUserAuthor,
    todoExists,
} from "../../models/todos/index.js";

const checkTodo = async (req, res) => {
    console.log(`The /check-todo request was catched at ${req.requestTime}`);

    const { id: todoId } = req.params;
    const { userId } = req;

    const exists = await todoExists(todoId);

    if (!exists) {
        console.log(
            `The /check-todo response was returned at ${res.getResponseTime()}`,
        );
        return res.notFound("Todo not found.");
    }

    const isAuthor = await isUserAuthor(todoId, userId);

    if (!isAuthor) {
        console.log(
            `The /check-todo response was returned at ${res.getResponseTime()}`,
        );
        return res.forbidden("Not your todo!");
    }

    const checkedTodo = await checkTodoAsync(todoId);

    console.log(
        `The /check-todo response was returned at ${res.getResponseTime()}`,
    );

    return res.success(checkedTodo);
};

export default checkTodo;
