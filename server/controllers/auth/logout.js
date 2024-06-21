const logout = async (req, res) => {
    res.clearCookie("ACCESS_TOKEN");
    res.clearCookie("REFRESH_TOKEN");

    return res.success("Successfully logged you out!");
};

export default logout;
