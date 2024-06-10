import { loginUser } from "../../services/auth/index.js";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../../services/auth/helpers.js";
import { validateFields } from "./helpers.js";
import { setExpirationDate } from "../../utils/index.js";

const login = async (req, res) => {
    console.log(`The /login request was catched at ${req.requestTime}`);

    const { email, password } = req.body;

    const isUserValid = await validateFields(email, password);

    if (!isUserValid) {
        return res.badRequest("One or more required fields are empty");
    }

    const response = await loginUser(email, password);

    if (!response) {
        console.log(
            `The /login response was returned at ${res.getResponseTime()}`,
        );
        return res.unauthorized(
            "The email or password you've specified is wrong.",
        );
    }

    const accessToken = await generateAccessToken(response);
    const refreshToken = await generateRefreshToken(response);

    res.cookie("ACCESS_TOKEN", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        expires: setExpirationDate(15),
        maxAge: 15 * 1000,
    });

    res.cookie("REFRESH_TOKEN", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        expires: setExpirationDate(24 * 60 * 60),
        maxAge: 24 * 60 * 60 * 1000,
    });
    console.log(`The /login response was returned at ${res.getResponseTime()}`);
    res.success(response);
};

export default login;
