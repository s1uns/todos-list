import Todo from "../../database/models/todo.js";
import { v4 as uuid } from "uuid";

const createTodo = async (req, res) => {
    console.log(`The /create-todo request was catched at ${req.requestTime}`);

    const { title } = req.body;

    if (title.trim().length == 0) {
        return res.badRequest("The title is empty");
    }

    const userId = req.userId;

    if (!userId) {
        return res.notFound("Couldn't get the user's id");
    }

    const newTodo = await Todo.create({
        id: uuid(),
        title: title,
        creatorId: userId,
    });

    console.log(
        `The /create-todo response was returned at ${res.getResponseTime()}`,
    );

    return res.success(newTodo);
};

export default createTodo;
