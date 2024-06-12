import { makeRequest } from "../../db.js";
import { v4 as uuid } from "uuid";
import getTodo from "./getTodo.js";

const createTodo = async (title, userId) => {
    const newTodo = {
        id: uuid(),
        title: title,
        userId: userId,
        isCompleted: false,
        isUpdated: false,
    };

    await makeRequest(
        `INSERT INTO todos (id, title, isCompleted, isUpdated, userId) VALUES ('${newTodo.id}', '${newTodo.title}', FALSE, FALSE, '${newTodo.userId}'); `,
    );

    const createdTodo = await getTodo(newTodo.id);

    return createdTodo;
};

export default createTodo;
