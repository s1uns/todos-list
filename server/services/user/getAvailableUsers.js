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
        attributes: ["id", "firstName", "lastName"],
        raw: true,
        ...queries,
    });

    const data = availableUsers.rows.map((userInfo) => ({
        userId: userInfo.id,
        fullName: `${userInfo.firstName} ${userInfo.lastName}`,
    }));

    const totalPages = Math.ceil(availableUsers?.count / limit);

    return { data: data, totalPages: totalPages };
};

export default getAvailableUsers;
