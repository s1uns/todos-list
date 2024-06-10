import { loginUser } from "../../services/auth/index.js";
import { generateToken } from "../../services/auth/helpers.js";

const login = async (req, res) => {
    console.log("The request body is: ", req.body);

    const { email, password } = req.body;

    const response = await loginUser(email, password);

    if (!response) {
        res.unauthorized("The email or password you've specified is wrong.");
        return;
    }

    const bearer = await generateToken(response);

    res.cookie("bearer", bearer);

    console.log("RESPONSE COOKIE: ", res.cookie);
    console.log("RESPONSE HEADERS: ", res.headers);
    console.log("RESPONSE BODY: ", res.body);
    res.success(response);
};

export default login;
