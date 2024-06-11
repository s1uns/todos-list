import { makeRequest } from "../../db.js";

const getTodos = async (userId) => {
    return await makeRequest(`SELECT * FROM todos WHERE userId = '${userId}';`);
};

export default getTodos;
