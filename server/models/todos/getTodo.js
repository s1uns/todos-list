import { makeRequest } from "../../db.js";

const mapToObject = async (todoArray) => {
    return {
        id: todoArray[0],
        title: todoArray[1],
        isCompleted: todoArray[2],
        isUpdated: todoArray[3],
        createdAt: todoArray[4],
        updatedAt: todoArray[5],
        userId: todoArray[6],
    };
};

const getTodo = async (todoId) => {

    const todo = Object.values(
        Object.values(
            JSON.parse(
                JSON.stringify(
                    await makeRequest(
                        `SELECT * FROM todos WHERE id = '${todoId}'`,
                    ),
                ),
            )[0],
        ),
    );

    return await mapToObject(todo);
};

export default getTodo;
