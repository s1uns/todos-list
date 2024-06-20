import { Shared } from "../../database/models/relations.js";
import { v4 as uuid } from "uuid";

const shareTodos = async (req, res) => {   
    console.log(`The /share-todos request was catched at ${req.requestTime}`);

    const userId = req.userId;

    if (!userId) {
        console.log(
            `The /share-todos response was returned at ${res.getResponseTime()}`,
        );
        return res.notFound("Couldn't get the user's id");
    }

    const { id: sharedWithId } = req.params;

    if (!sharedWithId) {
        console.log(
            `The /share-todos response was returned at ${res.getResponseTime()}`,
        );
        return res.badRequest(
            "Specify the id of user you want to share todos with",
        );
    }

    if (userId === sharedWithId) {
        console.log(
            `The /share-todos response was returned at ${res.getResponseTime()}`,
        );
        return res.badRequest("You cannot share the todos with yourself");
    }

    await Shared.create({
        id: uuid(),
        ownerId: userId,
        sharedWithId: sharedWithId,
        status: "active",
    });

    console.log(
        `The /share-todos response was returned at ${res.getResponseTime()}`,
    );

    return res.success("Successfully shared the todos!");
};

export default shareTodos;
