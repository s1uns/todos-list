import { sha256 } from "js-sha256";
import { v4 as uuid } from "uuid";
import { createUser, userExists } from "../../models/index.js";
import { generateAccessToken, generateRefreshToken } from "./helpers.js";

const registerUser = async (credentials) => {
    const passwordHash = sha256(credentials.password);
    const user = {
        id: uuid(),
        email: credentials.email,
        username: credentials.username,
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        password: passwordHash,
    };

    await createUser(user);

    const userInfo = {
        userId: user.id,
        email: user.email,
        username: user.username,
        fullName: `${user.firstName} ${user.lastName}`,
    };

    return userInfo;
};

export default registerUser;
