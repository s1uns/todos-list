import { Sequelize } from "sequelize";
import { Users } from "../../database/models/relations.js";

const getAvailableUsers = async ({ page, limit, alreadyChosenUsersIds }) => {
    const queries = {
        offset: (page - 1) * limit,
        limit: limit,
    };

    const availableUsers = await Users.findAndCountAll({
        where: {
            id: {
                [Sequelize.Op.notIn]: alreadyChosenUsersIds,
            },
        },
        attributes: ["id", "username", "firstName", "lastName"],
        raw: true,
        ...queries,
    });

    const users = availableUsers.rows.map((userInfo) => ({
        id: userInfo.id,
        username: userInfo.username,
        fullName: `${userInfo.firstName} ${userInfo.lastName}`,
    }));

    const totalPages = Math.ceil(availableUsers?.count / limit);

    return { users: users, totalPages: totalPages };
};

export default getAvailableUsers;
