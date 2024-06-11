import { makeRequest } from "../../db.js";

const isUserAuthor = async (todoId, userId) =>
    Object.values(
        Object.values(
            JSON.parse(
                JSON.stringify(
                    await makeRequest(
                        `SELECT COUNT(*) FROM todos WHERE id = '${todoId}' AND userId = '${userId}' ;`,
                    ),
                ),
            )[0],
        ),
    )[0];

export default isUserAuthor;
