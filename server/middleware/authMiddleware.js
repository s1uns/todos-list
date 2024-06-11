import jwt from "jsonwebtoken";
import { setExpirationDate } from "../utils/index.js";

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

                    req.userId = user.userId;

                    const accessToken = jwt.sign({ user }, secretKey, {
                        expiresIn: accessExpiresIn,
                    });

                    res.cookie("ACCESS_TOKEN", accessToken, {
                        // httpOnly: true,
                        secure: true,
                        sameSite: "strict",
                    });

                    next();
                }
            });
        } else {
            req.userId = decoded.user.userId;
            next();
        }
    });
};

export default authMiddleware;
