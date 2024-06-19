import Todo from "../../database/models/todo.js";
import User from "../../database/models/user.js";
import sequelize from "../../database/models/index.js";

const getTodos = async (req, res) => {
    console.log("User: ", User.associations);
    console.log("Todo: ", Todo.associations);
    console.log("Sequelize db: ", sequelize.models.User.associations);

    console.log(`The /get-todos request was catched at ${req.requestTime}`);

    const userId = req.userId;

    if (!userId) {
        return res.notFound("Couldn't get the user's id");
    }

    const todos = await Todo.findAll({
        where: { creatorId: userId },
        include: [{ model: User, as: "creator" }],
    });

    console.log(
        `The /get-todos response was returned at ${res.getResponseTime()}`,
    );

    return res.success(todos);
};

export default getTodos;
