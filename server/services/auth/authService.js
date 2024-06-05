import { generateToken } from "./helpers.js";
import { makeRequest } from "../../db.js";
import { sha256 } from "js-sha256";
import { v4 as uuid } from "uuid";

const loginUser = async (credentials) => {};
const registerUser = async (credentials) => {
    const passwordHash = sha256(credentials.password);
    const user = {
        id: uuid(),
        email: credentials.email,
        username: credentials.username,
        password: passwordHash,
    };

    await makeRequest(
        `INSERT INTO users (id, email, username, password) VALUES ('${user.id}', '${user.email}', '${user.username}', '${user.password}');`,
    );

    return await generateToken(user);
};

export { loginUser, registerUser };
