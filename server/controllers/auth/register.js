import { registerUser } from "../../services/auth/index.js";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../../services/auth/helpers.js";
import User from "../../database/models/Users.js";

const register = async (req, res) => {
    const {
        email,
        firstName,
        lastName,
        username,
        birthDate,
        gender,
        country,
        city,
        heardFrom,
        password,
    } = req.body;

    const emailIsTaken = await User.findOne({ where: { email } });

    if (emailIsTaken) {
        return res.unprocessableEntity(
            "The user with such email already exists"
        );
    }

    const usernameIsTaken = await User.findOne({ where: { username } });

    if (usernameIsTaken) {
        return res.unprocessableEntity("This username is taken.");
    }

    const response = await registerUser({
        email,
        firstName,
        lastName,
        username,
        birthDate,
        gender,
        country,
        city,
        heardFrom,
        password,
    });

    const accessToken = await generateAccessToken(response);
    const refreshToken = await generateRefreshToken(response);

    res.cookie("ACCESS_TOKEN", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
    });

    res.cookie("REFRESH_TOKEN", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
    });
    
    return res.success(response);
};

export default register;
