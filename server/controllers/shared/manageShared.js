import { Shared } from "../../database/models/relations.js";
import { v4 as uuid } from "uuid";
import {
    SHARE_ACTIVE,
    SHARE_INACTIVE,
} from "../../utils/constraints/sharedStatus.js";

const manageShared = async (req, res) => {
    const userId = req.userId;

    if (!userId) {
        return res.notFound("Couldn't get the user's id");
    }

    const { id: sharedWithId } = req.params;

    if (!sharedWithId) {
        return res.badRequest(
            "Specify the id of user you want to share todos with",
        );
    }

    if (userId === sharedWithId) {
        return res.badRequest("You cannot share the todos with yourself");
    }

    const relation = await Shared.findOne({
        where: { ownerId: userId, sharedWithId: sharedWithId },
    });

    if (!relation) {
        await Shared.create({
            id: uuid(),
            ownerId: userId,
            sharedWithId: sharedWithId,
            status: SHARE_ACTIVE,
        });

        return res.success("Successfully shared the todos!");
    } else {
        const newStatus =
            relation.status === SHARE_ACTIVE ? SHARE_INACTIVE : SHARE_ACTIVE;

        relation.status = newStatus;
        relation.save();
        return res.success(
            `Successfully changed the shared status to ${
                newStatus ? "active" : "inactive"
            }!`,
        );
    }
};

export default manageShared;
