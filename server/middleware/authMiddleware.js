const authMiddleware = (req, res, next) => {
    const bearer = req.cookies.bearer;

    if (!bearer) {
        res.unauthorized("You ned to authorize first. ");
    }

    console.log("Cookie exists! The cookie: ", bearer);

    next();
};

export default authMiddleware;
