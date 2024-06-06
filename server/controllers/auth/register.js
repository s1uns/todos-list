import { validateEmail, validatePassword } from "./helpers.js";
import { registerUser } from "../../services/auth/index.js";


const register = async (req, res) => {
    const { email, firstName, lastName, username, password } = req.body;

    const isEmailValid = await validateEmail(email);

    if (!isEmailValid) {
        res.status(422).send("The email you specified is wrong");
        return;
    }

    const isPasswordValid = await validatePassword(password);

    if (!isPasswordValid) {
        res.status(422).send("The password you specified is wrong");
        return;
    }

    const token = await registerUser({
        email,
        firstName,
        lastName,
        username,
        password,
    });
    res.status(200).send(token);
};

export default register;
