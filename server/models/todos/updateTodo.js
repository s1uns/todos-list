import { makeRequest } from "../../db.js";
import getTodo from "./getTodo.js";

const updateTodo = async (todoId, newTitle) => {
    await makeRequest(
        `UPDATE todos SET title = '${newTitle}', isUpdated = TRUE, updatedAt = NOW() WHERE id = '${todoId}';`,
    );

    const updatedTodo = await getTodo(todoId);

    return updatedTodo;
};

export default updateTodo;
