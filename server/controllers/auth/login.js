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
        return res.badRequest(
            "The email or password you've specified is wrong.",
        );
    }

    const accessToken = await generateAccessToken(response);
    const refreshToken = await generateRefreshToken(response);

    res.cookie("ACCESS_TOKEN", accessToken, {
        // httpOnly: true,
        secure: true,
        sameSite: "strict",

    });

    res.cookie("REFRESH_TOKEN", refreshToken, {
        // httpOnly: true,
        secure: true,
        sameSite: "strict",

    });
    console.log(`The /login response was returned at ${res.getResponseTime()}`);
    res.success(response);
};

export default login;
