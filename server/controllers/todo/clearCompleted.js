import { clearCompleted as clearCompletedAsync } from "../../models/todos/index.js";

const clearCompleted = async (req, res) => {
    console.log(
        `The /clear-completed request was catched at ${req.requestTime}`,
    );

    const todos = await clearCompletedAsync(req.userId);

    console.log(
        `The /clear-completed response was returned at ${res.getResponseTime()}`,
    );

    return res.success(todos);
};

export default clearCompleted;
