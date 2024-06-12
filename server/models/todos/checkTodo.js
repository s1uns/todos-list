import { makeRequest } from "../../db.js";
import getTodo from "./getTodo.js";

const checkTodo = async (todoId) => {
    const todo = await getTodo(todoId);

    await makeRequest(
        `UPDATE todos SET isCompleted = ${!todo.isCompleted}, updatedAt = NOW() WHERE id = '${todoId}';`,
    );

    const checkedTodo = await getTodo(todoId);

    return checkedTodo;
};

export default checkTodo;
