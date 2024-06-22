import jwt from "jsonwebtoken";
import { logger } from "./winstonLoggingMiddleware.js";

const authMiddleware = (req, res, next) => {
    const accessToken = req.cookies.ACCESS_TOKEN;
    const refreshToken = req.cookies.REFRESH_TOKEN;
    const secretKey = process.env.SECRET_KEY;
    const accessExpiresIn = process.env.ACCESS_TOKEN_EXPIRES_IN;

    jwt.verify(accessToken, secretKey, (err, decoded) => {
        if (err) {
            jwt.verify(refreshToken, secretKey, (err, decoded) => {
                if (err) {
                    return res.unauthorized("Failed to authenticate token.");
                } else {
                    const { user } = decoded;
                    const { userId } = user;

                    if (!userId) {
                        logger.error(`Couldn't get the user's id.`);
                        return res.notFound("Couldn't get the user's id.");
                    }

                    req.userId = userId;

                    const accessToken = jwt.sign({ user }, secretKey, {
                        expiresIn: accessExpiresIn,
                    });

                    res.cookie("ACCESS_TOKEN", accessToken, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "strict",
                    });

                    next();
                }
            });
        } else {
            const { user } = decoded;
            const { userId } = user;

            if (!userId) {
                logger.error(`Couldn't get the user's id.`);
                return res.notFound("Couldn't get the user's id.");
            }

            req.userId = userId;
            next();
        }
    });
};

export default authMiddleware;
