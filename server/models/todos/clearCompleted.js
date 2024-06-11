import { makeRequest } from "../../db.js";

const clearCompleted = async () => {
    await makeRequest(`DELETE FROM todos WHERE isCompleted = TRUE;`);
};

export default clearCompleted;
