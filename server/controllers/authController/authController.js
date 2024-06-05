const authService = require("../../services/authService");

const login = async (req, res) => {
    const user = await authService.login();
    const token = await authService.getBearer();
    return token;
};

const register = async (req, res) => {
    const user = await authService.register();
    const token = await authService.getBearer();
    return token;
};

module.exports = {
    login,
    register,
};
