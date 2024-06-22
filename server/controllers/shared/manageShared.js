import { Shared } from "../../database/models/relations.js";
import { v4 as uuid } from "uuid";
import {
    SHARE_ACTIVE,
    SHARE_INACTIVE,
} from "../../utils/constraints/sharedStatus.js";
import { logger } from "../../middleware/winstonLoggingMiddleware.js";

const manageShared = async (req, res) => {
    const userId = req.userId;

    const { id: sharedWithId } = req.params;

    if (!sharedWithId) {
        logger.warn(
            `User ${userId} tried to share his todos with undefined user.`,
        );
        return res.badRequest(
            "Specify the id of user you want to share todos with",
        );
    }

    if (userId === sharedWithId) {
        logger.warn(`User ${userId} tried to share his todos with himself.`);
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

        logger.info(
            `User ${userId} shared his todos with user ${sharedWithId}.`,
        );
        return res.success("Successfully shared the todos!");
    } else {
        const newStatus =
            relation.status === SHARE_ACTIVE ? SHARE_INACTIVE : SHARE_ACTIVE;

        relation.status = newStatus;
        relation.save();

        const stringStatus = newStatus ? "active" : "inactive";
        logger.info(
            `User ${userId} changed his sharing status with user ${sharedWithId} to ${stringStatus}.`,
        );
        return res.success(
            `Successfully changed the shared status to ${stringStatus}!`,
        );
    }
};

export default manageShared;
