import { createClient } from "redis";
import { logger } from "./middleware/winstonLoggingMiddleware.js";
import { getSharedUsers } from "./services/user/index.js";

const REDIS_PORT = process.env.REDIS_PORT || 6379;

const redisClient = createClient(REDIS_PORT);

redisClient.on("error", (err) => console.log("Redis Client Error", err));

redisClient.setConnection = async (connectionId, userId) => {
    await redisClient.set(`${connectionId}`, userId);
};

redisClient.getSharedConnections = async (connectionId) => {
    const userId = await redisClient.get(connectionId);

    const sharedUsers = await getSharedUsers(userId);
    const keys = await redisClient.keys("*", async (err, keys) => {
        if (err) return logger.error(err);
    });

    console.log("Keys: ", keys);

    const connections = Promise.all(
        keys.map(async (key) => {
            const id = await redisClient.get(key);
            console.log(`${id} - ${key} `);

            const applies =
                key != connectionId &&
                (sharedUsers.includes(id) || id == userId);

            if (applies) {
                return key;
            }
            return null;
        })
    );

    return connections;
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
