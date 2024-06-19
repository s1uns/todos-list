import sequelize from "../../database/models/index.js";
import { Shared, Users } from "../../database/models/relations.js";
import { Sequelize } from "sequelize";

const getAvailableUsers = async (req, res) => {
    console.log(
        `The /available-users request was catched at ${req.requestTime}`,
    );

    const userId = req.userId;

    if (!userId) {
        return res.notFound("Couldn't get the user's id");
    }

    const alreadyChosenUsersIds = (
        await Shared.findAll({
            where: { ownerId: userId },
            attributes: ["sharedWithId"],
        })
    ).map((sharedWith) => sharedWith.sharedWithId);

    console.log("Already chosen: ", alreadyChosenUsersIds);

    const availableUsers = (
        await Users.findAll({
            where: {
                id: {
                    [Sequelize.Op.notIn]: [...alreadyChosenUsersIds, userId],
                },
            },
            attributes: ["id", "firstName", "lastName"],
        })
    ).map((userInfo) => ({
        userId: userInfo.id,
        fullName: `${userInfo.firstName} ${userInfo.lastName}`,
    }));

    console.log(
        `The /available-users response was returned at ${res.getResponseTime()}`,
    );

    return res.success(availableUsers);
};

export default getAvailableUsers;
