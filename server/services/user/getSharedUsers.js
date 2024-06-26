import { Shared } from "../../database/models/relations.js";
import { SHARE_ACTIVE } from "../../utils/constants/sharedStatus.js";

const getSharedUsers = async (userId) => {

    const sharedUsers = await Shared.findAll({
        where: {
            ownerId: userId,
            status: SHARE_ACTIVE,
        },
        attributes: ["sharedWithId"],
        raw: true,
    });

    const usersList = sharedUsers.map((userInfo) => {
        return userInfo.sharedWithId;
    });

    return usersList;
};

export default getSharedUsers;
