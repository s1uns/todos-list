const responseMiddleware = (req, res, next) => {
    res.notFound = (errorMessage) => {
        res.status(404).json({ errorCode: "Not Found", message: errorMessage });
    };

    res.badRequest = (errorMessage) => {
        res.status(400).json({
            errorCode: "Bad Request",
            message: errorMessage,
        });
    };

    res.unprocessableEntity = (errorMessage) => {
        res.status(422).json({
            errorCode: "Unprocessable Entity",
            message: errorMessage,
        });
    };

    res.success = (data) => {
        res.status(200).json(data);
    };

    next();
};

export default responseMiddleware;
