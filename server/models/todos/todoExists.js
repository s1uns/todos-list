import { makeRequest } from "../../db.js";

const todoExists = async (todoId) =>
    Object.values(
        Object.values(
            JSON.parse(
                JSON.stringify(
                    await makeRequest(
                        `SELECT COUNT(*) FROM todos WHERE id = '${todoId}';`,
                    ),
                ),
            )[0],
        ),
    )[0];

export default todoExists;
