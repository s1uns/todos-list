import { makeRequest } from "../db.js";

const createUser = async ({
    id,
    email,
    firstName,
    lastName,
    username,
    password,
}) =>
    await makeRequest(
        `INSERT INTO users (id, email, firstName, lastName , username, password) VALUES ('${id}', '${email}', '${firstName}', '${lastName}', '${username}', '${password}');`,
    );

const userExists = async (email) =>
    await makeRequest(`SELECT COUNT(*) FROM users WHERE email = '${email}';`);

const passwordIsCorrect = async (email, passwordHash) =>
    await makeRequest(
        `SELECT COUNT(*) FROM users WHERE email = '${email}' AND password = '${passwordHash}';`,
    );

export { createUser, userExists, passwordIsCorrect };
