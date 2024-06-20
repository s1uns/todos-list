import { validateEmail, validatePassword } from "./helpers.js";
import { registerUser } from "../../services/auth/index.js";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../../services/auth/helpers.js";
import { validateFields } from "./helpers.js";
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

    const isUserValid = await validateFields(
        email,
        firstName,
        username,
        birthDate,
        gender,
        country,
        city,
        heardFrom,
        password,
    );

    if (!isUserValid) {

        return res.badRequest("One or more required fields are empty");
    }

    const userAlreadyExists = await User.findOne({ where: { email } });

    if (userAlreadyExists) {
        return res.unprocessableEntity(
            "The user with such email already exists",
        );
    }

    const isEmailValid = await validateEmail(email);

    if (!isEmailValid) {

        return res.unprocessableEntity("The email you specified is wrong");
    }

    const isPasswordValid = await validatePassword(password);

    if (!isPasswordValid) {

        return res.unprocessableEntity("The password you specified is wrong");
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
