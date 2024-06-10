import jwt from "jsonwebtoken";
import { setExpirationDate } from "../utils/index.js";

const authMiddleware = (req, res, next) => {
    const accessToken = req.cookies.ACCESS_TOKEN;
    const refreshToken = req.cookies.REFRESH_TOKEN;
    const secretKey = process.env.SECRET_KEY;
    const accessExpiresIn = process.env.ACCESS_TOKEN_EXPIRES_IN;


    if (!accessToken) {
        if (!refreshToken) {
            return res.unauthorized("You need to authorize first. ");
        }

        const { user } = jwt.verify(refreshToken, secretKey);
        const accessToken = jwt.sign({ user }, secretKey, {
            expiresIn: accessExpiresIn,
        });

        req.userId = user.userId;

        res.cookie("ACCESS_TOKEN", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            expires: setExpirationDate(5 * 60),
            maxAge: 5 * 60 * 1000,
        });
    } else {
        jwt.verify(accessToken, secretKey, (err, decoded) => {
            if (err) {
                return res.forbidden("Failed to authenticate token.");
            }

            req.userId = decoded.user.userId;
        });
    }

    next();
};

export default authMiddleware;
