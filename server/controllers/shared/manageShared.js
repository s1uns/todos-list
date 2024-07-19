import { v4 as uuid } from "uuid";
import { Shared } from "../../database/models/relations.js";
import { logger } from "../../middleware/winstonLoggingMiddleware.js";
import redisClient from "../../redisClient.js";
import getUser from "../../services/user/getUser.js";
import socketService from "../../socket.js";
import { sharedTodosActions } from "../../utils/actions/notificationActions.js";
import {
	SHARE_ACTIVE,
	SHARE_INACTIVE,
} from "../../utils/constants/sharedStatus.js";
import { SOCKET_ACTION } from "../../utils/constants/socketActions.js";

const manageShared = async (req, res) => {
	const userId = req.userId;

	const { id: sharedWithId } = req.params;
	const io = socketService.getIO();
	const user = await getUser(userId);

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

	const connections = await redisClient.getSharerAndReceiverConnections(
		userId,
		sharedWithId,
	);

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
		res.success("Successfully shared the todos!");
	} else {
		const newStatus =
			relation.status == SHARE_ACTIVE ? SHARE_INACTIVE : SHARE_ACTIVE;

		relation.status = newStatus;
		relation.save();

		const stringStatus = newStatus === SHARE_ACTIVE ? "active" : "inactive";
		logger.info(
			`User ${userId} changed his sharing status with user ${sharedWithId} to ${stringStatus}.`,
		);
		res.success(
			`Successfully changed the shared status to ${stringStatus}!`,
		);
	}

	connections.map(async (connection) => {
		io.to(connection.connectionId).emit(
			SOCKET_ACTION,
			sharedTodosActions({
				sharerId: userId,
				receiverId: sharedWithId,
				author: user.fullName,
				isShared: relation ? relation.status : true,
			}),
		);
		logger.info(
			`Changed the sharing status between user ${userId} and user ${sharedWithId} on the socket ${connection.connectionId}`,
		);
	});

	return;
};

export default manageShared;
