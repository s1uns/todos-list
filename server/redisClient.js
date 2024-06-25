import { createClient } from "redis";
import { logger } from "./middleware/winstonLoggingMiddleware.js";

const REDIS_PORT = process.env.REDIS_PORT || 6379;

const redisClient = createClient(REDIS_PORT);

redisClient.on("error", (err) => console.log("Redis Client Error", err));

redisClient.setConnection = async (connectionId, userId) =>
    await redisClient.set(`connections:${connectionId}`, userId);

try {
    await redisClient.connect(REDIS_PORT);
    logger.info("Successfully connected to redis");
} catch (err) {
    logger.error("Failed to connect to redis: ", err);
}

export default redisClient;
