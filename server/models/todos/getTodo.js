import { makeRequest } from "../../db.js";

const mapToObject = async (todo) => {
    const todoAsArray = Object.values(
        Object.values(JSON.parse(JSON.stringify(todo))[0]),
    );

    return {
        id: todoAsArray[0],
        title: todoAsArray[1],
        isCompleted: todoAsArray[2],
        isUpdated: todoAsArray[3],
        createdAt: todoAsArray[4],
        updatedAt: todoAsArray[5],
        userId: todoAsArray[6],
    };
};

const getTodo = async (todoId) => {
    const todo = await makeRequest(
        `SELECT * FROM todos WHERE id = '${todoId}'`,
    );

    if (!todo.length) return null;

    return await mapToObject(todo);
};

export default getTodo;
