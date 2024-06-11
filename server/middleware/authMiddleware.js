import jwt from "jsonwebtoken";
import { setExpirationDate } from "../utils/index.js";

const authMiddleware = (req, res, next) => {
    const accessToken = req.cookies.ACCESS_TOKEN;
    const refreshToken = req.cookies.REFRESH_TOKEN;

    jwt.verify(accessToken, secretKey, (err, decoded) => {
        if (err) {
            jwt.verify(accessToken, secretKey, (err, decoded) => {
                if (err) {
                    return res.unauthorized("Failed to authenticate token.");
                }

                req.userId = decoded.user.userId;
                const { user } = jwt.verify(refreshToken, secretKey);
                const accessToken = jwt.sign({ user }, secretKey, {
                    expiresIn: accessExpiresIn,
                });

                req.userId = user.userId;

                res.cookie("ACCESS_TOKEN", accessToken, {
                    // httpOnly: true,
                    secure: true,
                    sameSite: "strict",
                });
            });
        }

        req.userId = decoded.user.userId;
    });

    next();
};

export default authMiddleware;
