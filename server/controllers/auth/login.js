import { loginUser } from "../../services/auth/index.js";
import { generateToken } from "../../services/auth/helpers.js";
import { validateFields } from "./helpers.js";

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

    const bearer = await generateToken(response);

    res.cookie("bearer", bearer);
    console.log(`The /login response was returned at ${res.getResponseTime()}`);
    res.success(response);
};

export default login;
