import { validateEmail, validatePassword } from "./helpers.js";
import { registerUser } from "../../services/auth/index.js";

const register = async (req, res) => {
    console.log("Request: ", req.body);
    const isEmailValid = await validateEmail(req.body.email);

    if (!isEmailValid) {
        res.status(422).send("The email you specified is wrong");
        return;
    }

    const isPasswordValid = await validatePassword(req.body.password);

    if (!isPasswordValid) {
        res.status(422).send("The password you specified is wrong");
        return;
    }

    const token = await registerUser(req.body);
    res.status(200).send(token);
};

export default register;
