import { validateEmail, validatePassword } from "./helpers.js";
import { registerUser } from "../../services/auth/index.js";
import { userExists } from "../../models/user.js";

const register = async (req, res) => {
    console.log(`The /register request was catched at ${req.requestTime}`);

    const { email, firstName, lastName, username, password } = req.body;

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

    const token = await registerUser({
        email,
        firstName,
        lastName,
        username,
        password,
    });

    console.log(
        `The /register response was returned at ${res.getResponseTime()}`,
    );

    res.success(token);
};

export default register;
