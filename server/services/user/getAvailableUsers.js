import { Op } from "sequelize";
import { Shared, Users } from "../../database/models/relations.js";
import { SHARE_ACTIVE } from "../../utils/constraints/sharedStatus.js";

const getAvailableUsers = async ({ page, limit, userId }) => {
    const queries = {
        offset: (page - 1) * limit,
        limit: limit,
    };

    const availableUsers = await Users.findAndCountAll({
        where: {
            id: {
                [Op.not]: userId,
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
            !!userInfo.sharedWith[0] && userInfo.sharedWith[0].status === SHARE_ACTIVE
                ? true
                : false,
    }));

    const totalPages = Math.ceil(availableUsers?.count / limit);

    return { list: list, totalPages: totalPages };
};

export default getAvailableUsers;
