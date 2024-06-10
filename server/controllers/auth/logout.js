const logout = async (req, res) => {
    res.cookie("ACCESS_TOKEN");
    res.clearCookie("ACCESS_TOKEN");

    res.cookie("REFRESH_TOKEN");
    res.clearCookie("REFRESH_TOKEN");

    res.success({ message: "Successfully logged you out!" });
};

export default logout;
