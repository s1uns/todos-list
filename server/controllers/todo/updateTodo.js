import {
    updateTodo as updateTodoAsync,
    isUserAuthor,
    todoExists,
} from "../../models/todos/index.js";

const updateTodo = async (req, res) => {
    console.log(`The /update-todo request was catched at ${req.requestTime}`);

    const { id: todoId, newTitle } = req.body;
    const { userId } = req;

    const exists = await todoExists(todoId);

    if (!exists) {
        console.log(
            `The /update-todo response was returned at ${res.getResponseTime()}`,
        );
        return res.notFound("Todo not found.");
    }

    const isAuthor = await isUserAuthor(todoId, userId);

    if (!isAuthor) {
        console.log(
            `The /update-todo response was returned at ${res.getResponseTime()}`,
        );
        return res.forbidden("Not your todo!");
    }

    const updatedTodo = await updateTodoAsync(todoId, newTitle);


    console.log(
        `The /update-todo response was returned at ${res.getResponseTime()}`,
    );

    return res.success(updatedTodo);
};

export default updateTodo;
