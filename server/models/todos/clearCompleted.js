import { makeRequest } from "../../db.js";
import getTodos from "./getTodos.js";

const clearCompleted = async (userId) => {
    await makeRequest(
        `DELETE FROM todos WHERE isCompleted = TRUE AND userId = '${userId}';`,
    );

    const allTodos = await getTodos(userId);

    return allTodos;
};

export default clearCompleted;
