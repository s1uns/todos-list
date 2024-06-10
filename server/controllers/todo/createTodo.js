import { createTodo as createTodoAsync } from "../../services/todo/index.js";

const createTodo = async (req, res) => {
    console.log(`The /create-todo request was catched at ${req.requestTime}`);

    const { title } = req.body;

    const userId = req.userId;

    const newTodo = await createTodoAsync(title, userId);

    console.log(
        `The /create-todo response was returned at ${res.getResponseTime()}`,
    );

    res.success(newTodo);
};

export default createTodo;
