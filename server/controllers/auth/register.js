import { validateEmail, validatePassword } from "./helpers.js";
import { registerUser } from "../../services/auth/index.js";
import { userExists } from "../../models/user.js";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../../services/auth/helpers.js";
import { validateFields } from "./helpers.js";

const register = async (req, res) => {
    console.log(`The /register request was catched at ${req.requestTime}`);

    const { email, firstName, lastName, username, password } = req.body;

    const isUserValid = await validateFields(
        email,
        firstName,
        username,
        password,
    );

    if (!isUserValid) {
        return res.badRequest("One or more required fields are empty");
    }

    const userAlreadyExists = await userExists(email);

    if (userAlreadyExists) {
        res.unprocessableEntity("The user with such email already exists");
        console.log(
            `The /register response was returned at ${res.getResponseTime()}`,
        );
        return;
    }

    const isEmailValid = await validateEmail(email);

    if (!isEmailValid) {
        res.unprocessableEntity("The email you specified is wrong");
        console.log(
            `The /register response was returned at ${res.getResponseTime()}`,
        );
        return;
    }

    const isPasswordValid = await validatePassword(password);

    if (!isPasswordValid) {
        res.unprocessableEntity("The password you specified is wrong");
        console.log(
            `The /register response was returned at ${res.getResponseTime()}`,
        );
        return;
    }

    const response = await registerUser({
        email,
        firstName,
        lastName,
        username,
        password,
    });

    const accessToken = await generateAccessToken(response);
    const refreshToken = await generateRefreshToken(response);

    res.cookie("ACCESS_TOKEN", accessToken),
        {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 60 * 5 * 1000,
        };

    res.cookie("REFRESH_TOKEN", refreshToken),
        {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/refresh",
            maxAge: 24 * 60 * 60 * 1000,
        };

    console.log(
        `The /register response was returned at ${res.getResponseTime()}`,
    );

    res.success(response);
};

export default register;
