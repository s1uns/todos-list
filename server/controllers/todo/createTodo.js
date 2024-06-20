import Todo from "../../database/models/Todos.js";
import { v4 as uuid } from "uuid";

const createTodo = async (req, res) => {
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


    return res.success(newTodo);
};

export default createTodo;
