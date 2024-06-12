const logout = async (req, res) => {
    console.log(`The /logout request was catched at ${req.requestTime}`);

    res.clearCookie("ACCESS_TOKEN");

    res.clearCookie("REFRESH_TOKEN");

    console.log(
        `The /logout response was returned at ${res.getResponseTime()}`,
    );

    return res.success({ message: "Successfully logged you out!" });
};

export default logout;
