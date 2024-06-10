const responseMiddleware = (req, res, next) => {
    res.notFound = (errorMessage) => {
        res.status(404).json({
            code: 404,
            message: errorMessage,
            success: false,
        });
    };

    res.badRequest = (errorMessage) => {
        res.status(400).json({
            code: 400,
            message: errorMessage,
            success: false,
        });
    };

    res.unprocessableEntity = (errorMessage) => {
        res.status(422).json({
            code: 422,
            message: errorMessage,
            success: false,
        });
    };

    res.unauthorized = (errorMessage) => {
        res.status(401).json({
            code: 401,
            message: errorMessage,
            success: false,
        });
    };

    res.forbidden = (errorMessage) => {
        res.status(403).json({
            code: 403,
            message: errorMessage,
            success: false,
        });
    };

    res.success = (data) => {
        res.status(200).json({
            code: 200,
            message: "Success",
            data: data,
            success: true,
        });
    };

    next();
};

export default responseMiddleware;
