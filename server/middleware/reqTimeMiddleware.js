const reqTimeMiddleware = (req, res, next) => {
    req.requestTime = getTime();

    res.getResponseTime = () => {
        return getTime();
    };

    next();
};

const getTime = () => {
    const now = new Date();
    var day = String(now.getDate()).padStart(2, "0");
    var month = String(now.getMonth() + 1).padStart(2, "0");
    var year = now.getFullYear();

    var hours = String(now.getHours()).padStart(2, "0");
    var minutes = String(now.getMinutes()).padStart(2, "0");
    var seconds = String(now.getSeconds()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

export default reqTimeMiddleware;
