import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const bearer = req.cookies.bearer;
    const secretKey = process.env.SECRET_KEY;

    if (!bearer) {
        return res.unauthorized("You need to authorize first. ");
    }

    jwt.verify(bearer, secretKey, (err, decoded) => {
        if (err) {
            return res.forbidden("Failed to authenticate token.");
        }

        req.userId = decoded.user.userId;
    });

    next();
};

export default authMiddleware;
