import { loginUser } from "../../services/auth/index.js";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../../services/auth/helpers.js";

const login = async (req, res) => {
    const { email, password } = req.body;

    const response = await loginUser(email, password);

    if (!response) {
        return res.badRequest(
            "The email or password you've specified is wrong.",
        );
    }

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

export default login;
