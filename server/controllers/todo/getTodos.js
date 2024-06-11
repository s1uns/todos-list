import { getTodos as getTodosAsync } from "../../models/todos/index.js";

const getTodos = async (req, res) => {
    console.log(`The /get-todos request was catched at ${req.requestTime}`);

    const todos = await getTodosAsync(req.userId);

    console.log(
        `The /get-todos response was returned at ${res.getResponseTime()}`,
    );

    return res.success(todos);
};

export default getTodos;
