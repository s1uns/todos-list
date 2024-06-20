import { Shared } from "../../database/models/relations.js";
import { getAvailableUsers as getAvailableUsersAsync } from "../../services/user/index.js";

const getAvailableUsers = async (req, res) => {
    console.log(
        `The /available-users request was catched at ${req.requestTime}`,
    );

    const userId = req.userId;
    const { page, limit } = req.query;

    console.log("page: ", page);
    console.log("limit: ", limit);

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
        alreadyChosenUsersIds: [...alreadyChosenUsersIds, userId],
    });

    console.log(
        `The /available-users response was returned at ${res.getResponseTime()}`,
    );

    return res.success(result);
};

export default getAvailableUsers;
