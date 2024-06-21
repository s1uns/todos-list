import { Shared } from "../../database/models/relations.js";
import { getAvailableUsers as getAvailableUsersAsync } from "../../services/user/index.js";

const getAvailableUsers = async (req, res) => {

    const userId = req.userId;
    const { page, limit } = req.query;

    if (!userId) {
        return res.notFound("Couldn't get the user's id");
    }

    const alreadyChosenUsersIds = (
        await Shared.findAll({
            where: { ownerId: userId, status: "active" },
            attributes: ["sharedWithId"],
        })
    ).map((sharedWith) => sharedWith.sharedWithId);

    const result = await getAvailableUsersAsync({
        page: +page ? +page : 1,
        limit: +limit ? +limit : 3,
        userId: userId,
    });

    return res.success(result);
};

export default getAvailableUsers;
