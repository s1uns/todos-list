import { createClient } from "redis";
import { logger } from "./middleware/winstonLoggingMiddleware.js";
import { getSharedUsers } from "./services/user/index.js";

const REDIS_PORT = process.env.REDIS_PORT || 6379;

const redisClient = createClient(REDIS_PORT);

redisClient.on("error", (err) => logger.error("Redis Client Error", err));

redisClient.setConnection = async (connectionId, userId) => {
	await redisClient.set(`${connectionId}`, userId);
};

redisClient.getSharedConnections = async (userId) => {
	const sharedUsers = await getSharedUsers(userId);

	const keys = await redisClient.keys("*", async (err, keys) => {
		if (err) return logger.error(err);
	});

	const connections = await Promise.all(
		keys.map(async (key) => {
			const id = await redisClient.get(key);

			const applies = sharedUsers.includes(id) || id == userId;
			return applies ? key : null;
		}),
	);

	const filteredConnections = connections.filter((key) => key !== null);

	return filteredConnections;
};

redisClient.getUsersConnections = async (userId) => {
	const keys = await redisClient.keys("*", async (err, keys) => {
		if (err) return logger.error(err);
	});

	const connections = await Promise.all(
		keys.map(async (key) => {
			const id = await redisClient.get(key);

			const applies = id === userId;
			return applies ? key : null;
		}),
	);

	const filteredConnections = connections.filter((key) => key !== null);

	return filteredConnections;
};

redisClient.deleteConnection = async (connectionId) =>
	await redisClient.del(connectionId);

try {
	await redisClient.connect(REDIS_PORT);
	logger.info("Successfully connected to redis");
} catch (err) {
	logger.error("Failed to connect to redis: ", err);
}

export default redisClient;
