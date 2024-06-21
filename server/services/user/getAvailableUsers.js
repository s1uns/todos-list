import { Sequelize } from "sequelize";
import { Shared, Users } from "../../database/models/relations.js";

const getAvailableUsers = async ({ page, limit, userId }) => {
    const queries = {
        offset: (page - 1) * limit,
        limit: limit,
    };

    const availableUsers = await Users.findAndCountAll({
        where: {
            id: {
                [Sequelize.Op.not]: userId,
            },
        },
        attributes: ["id", "username", "firstName", "lastName", "fullName"],
        include: { model: Shared, as: "sharedWith", attributes: ["status"] },
        ...queries,
    });

    const list = availableUsers.rows.map((userInfo) => ({
        id: userInfo.id,
        username: userInfo.username,
        fullName: userInfo.fullName,
        isShared:
            !!userInfo.sharedWith[0] && userInfo.sharedWith[0].status === "active"
                ? true
                : false,
    }));

    const totalPages = Math.ceil(availableUsers?.count / limit);

    return { list: list, totalPages: totalPages };
};

export default getAvailableUsers;
